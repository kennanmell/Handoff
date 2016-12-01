/* This will be a list that one can scroll through of requests, and clicking on individual
requests will display a pop up of the requests. The user will also be able to click on the
organization to go to the page of the organization. */

import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, TextInput, Alert, Modal,
            StyleSheet, AppRegistry, ListView, Text, View } from 'react-native';

// These are different styles that components use.
const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: 6,
    backgroundColor: '#642D64',
  },
  container: {
      flex: 1,
      padding: 8,
      height: 70,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#642D64',
  },
  input: {
      height: 50,
      flex: 1,
      paddingHorizontal: 8,
      fontSize: 25,
      backgroundColor: '#FFFFFF',
      borderRadius: 2,
  },
    orgButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginLeft: 3,
        marginTop: 3,
        marginRight: 3,
        borderWidth: 1,
        borderRadius: 5,
        padding: 3,
        borderColor: 'black',
        marginBottom: 3,
        backgroundColor: '#642D64',
    },
  welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
  },
});

// This header is a search bar and it actually looks good.
const Header = (props) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder={props.org}
      onChangeText={(text) => console.log('searching for ', text)}
    />
  </View>
);

// This method returns a Promise that will at some point, probably very quickly return
// a list of 30 requests. Passed organization is a string to filter by, if null it will return
// all requests.
async function getRequests(organization) {
    params = null;
    listOfOrg = [organization];
    if (organization != null) {
        params = JSON.stringify({ limit: 30, organizations: listOfOrg})
    } else {
        params = JSON.stringify({ limit: 30})
    }
    return fetch('https://u116vqy0l2.execute-api.us-west-2.amazonaws.com/prod/requests', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: params
    })
}

// This class is a display of the individual requests and will provide buttons to see more info
// about either the request or the organization that posted it.
class Row extends Component {
    constructor(props) {
        super(props);
        // These are what is displayed, while the this.state variables are what the edit is set to
        this.title = props.title;
        this.description = props.description;
        this.uuid = props.organization;
        this.organization = props.organization_name; // sadly organization is now uuid so
        this.tags = props.tags;
        this.time = (new Date(props.time)).toString();

        this.state = {
          modalVisible: false,
        }
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    async getOrganization(organization) {
        return fetch('https://u116vqy0l2.execute-api.us-west-2.amazonaws.com/prod/organizations/info', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({uuid: organization})
        })
    }

    render() {
      return(
        <View style={{padding: 10}}>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Close through the cancel button.")}}
            >
            <View style={{marginTop: 22}}>
                  <View>
                      <Text>{this.title}</Text>
                      <Text>{this.description}</Text>
                      <Text>Organization: {this.organization}</Text>
                      <Text>Tags: {this.tags}</Text>
                      <Text>Time Posted: {this.time}</Text>
                      <TouchableHighlight style={styles.orgButton} onPress={() => { this.setModalVisible(!this.state.modalVisible)}} ><Text style={{color:'#FFFFFF'}}>Return to Feed</Text></TouchableHighlight>
                  </View>
                  </View>
          </Modal>
          <Text style={{fontSize: 20}}>  {this.title}</Text>
         <TouchableHighlight style={styles.orgButton}
              onPress={()=> this.getOrganization(this.uuid)
                                .then((response) => response.json())
                                .then((responseJson) => {
                                      Alert.alert('Organization Info', "Name: " + responseJson.info.name + "\nLocation: " + responseJson.info.location,
                                        [{text: 'Subscribe', onPress: ()=>console.log('subscribe, yo!')},
                                        {text: 'Close', onPress:()=>console.log('done')}])
                                })
                                .catch((error) => {
                                    console.error(error);
                                })}
                          ><Text style={{color:'#FFFFFF'}}>{this.organization}</Text></TouchableHighlight>
          <Text style={{alignItems: 'center'}, {fontSize: 18}}>{this.description}</Text>
          <TouchableHighlight style={styles.orgButton} onPress={() => {this.setModalVisible(true)}}><Text style={{color:'#FFFFFF'}}> More info . . . </Text></TouchableHighlight>
        </View>);
    }
}


/* This class represents an request by a specific organization, and will display a button that will
allow the organization to edit the request.
*/
class OrgRow extends Component {
    constructor(props) {
        super(props);
        // These are what is displayed, while the this.state variables are what the edit is set to
        this.title = props.title;
        this.description = props.description;

        this.state = {
          title: props.title,
          time: props.time,
          organization: props.organization_name, //sadly organization is now the uuid
          description: props.description,
          tags: props.tags,
          modalVisible: false,
        }
    }

    // This method will create update the request for the request that the orgrow represents,
    // takes in a boolean to indicate whether to edit or delete the request, true means edit.
    async updateRequest(edit) {
        params = null;
        if (!edit) {
            params = JSON.stringify({ organization: window.org.uuid,
                                                          time: this.state.time,
                                                          username: window.org.userName,
                                                          auth: window.org.auth})
        } else {
            params = JSON.stringify({ organization: window.org.uuid,
                                                 time: this.state.time,
                                                 title: this.state.title,
                                                 description: this.state.description,
                                                 tags: this.state.tags,
                                                 username: window.org.userName,
                                                 auth: window.org.auth})
        }
        return fetch('https://u116vqy0l2.execute-api.us-west-2.amazonaws.com/prod/requests/update', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: params
        })
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    render() {
      return(
        <View style={{padding: 10}}>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Close through the cancel button.")}}
            >
            <View style={{marginTop: 22}}>
              <Text style={styles.welcome}> Handoff</Text>
              <TextInput
                style={{height: 40}}
                defaultValue={this.state.title}
                onChangeText={(text) => this.setState({title: text})}
                tag='titleInput'
              />
               <TextInput
                    style={{height: 40}}
                    defaultValue={this.state.description}
                    onChangeText={(text) => this.setState({description: text})}
                    tag='detailsInput'
               />
               <TextInput
                style={{height: 40}}
                defaultValue={this.state.tags}
                tag='keywordsInput'
                onChangeText={(text) => this.setState({tags: text})}
                />
              <TouchableHighlight
                  style={styles.orgButton}
                onPress={() => {Alert.alert('Update Successful', 'Sent your edited request.');
                    this.title = this.state.title;
                    this.description = this.state.description;
                    this.setModalVisible(!this.state.modalVisible);
                    this.updateRequest(true);}}
                    tag='submitButton'><Text style={{color:'#FFFFFF'}}> Submit Edit</Text></TouchableHighlight>
              <TouchableHighlight
                    style={styles.orgButton}
                  onPress={() => {Alert.alert('Update Successful', 'Sent your edited request.');
                      this.title = "<deleted>";
                      this.description = "";
                      this.setModalVisible(!this.state.modalVisible);
                      this.updateRequest(false);}}
                      tag='submitButton'><Text style={{color:'#FFFFFF'}}> Delete Request</Text></TouchableHighlight>
              <TouchableHighlight
                  style={styles.orgButton}
                  onPress={() => {this.setModalVisible(!this.state.modalVisible);
                                  this.state.title = this.title;
                                  this.state.description = this.description;}}
                  ><Text style={{color:'#FFFFFF'}}>Cancel</Text></TouchableHighlight>
            </View>
          </Modal>
          <Text style={{fontSize: 20}}>  {this.title}</Text>
          <Text style={{alignItems: 'center'}, {fontSize: 18}}>{this.description}</Text>
          <TouchableHighlight style={styles.orgButton} onPress={() => {this.setModalVisible(true)}}>
                <Text style={{color:'#FFFFFF'}}>Edit Request </Text></TouchableHighlight>
        </View>);
    }
}

// This component is a scrollable list of requests. Intially it will display a text that shows we
// are still waiting on the server to provide our requests, but once the request to the server has
// been completed the received requests will be displayed in the scrollable list, with buttons for
// more information.
export default class RequestFeed extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if (props.organization != null) {
            this.organization = window.org.uuid; // yeah i blame the weird backend documentation
        }

        // Sets the initial page to a loading page
        this.state = {
          tags = [];
          dataSource: ds.cloneWithRows([]);
        }

        // the .then statements will then handle the response
        // and update the listviews datasource once there is data to update it with.
        getRequests(this.organization)
              .then((response) => response.json())
              .then((responseJson) => {
                  this.setState({
                    dataSource: ds.cloneWithRows(responseJson.requests)
                  });
                })
              .catch((error) => {
                console.error(error);
        });
    }

    setTags(listofTags) {
        this.setState({tags=listofTags});
    }

    render() {
      if (this.organization == null) {
         return (
            <View>
              <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <Row {...rowData} />}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                renderHeader={() => <Header />}
              />
            </View>
         );
      } else {
        return (
            <View>
              <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <OrgRow {...rowData}/>}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                renderHeader={() => <Header org={this.organization}/>}
              />
            </View>
        );
      }
    }
}
