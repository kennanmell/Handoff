/* This will be a list that one can scroll through of requests, and clicking on individual
requests will display a pop up of the requests. The user will also be able to click on the
organization to go to the page of the organization. */

import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, TextInput, Alert, Modal,
            StyleSheet, AppRegistry, ListView, Text, View } from 'react-native';
import{Button} from 'native-base';

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
        color: 'white',
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
      placeholder="Search..."
      onChangeText={(text) => console.log('searching for ', text)}
    />
  </View>
);

// This method returns a Promise that will at some point, probably very quickly return
// a list of 30 requests. Passed organization is a string to filter by
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

// The row is a component that should have a title, organization, and description passed in as props
// This component will display these components.
const Row = (props) => (
  <View style={{padding: 10}}>
    <Text style={{fontSize: 20}}>  {props.title}</Text>
    <Text style={styles.orgButton}
        onPress={()=>Alert.alert('Organization Info', null,
                    [{text: 'Subscribe', onPress: ()=>console.log('subscribe, yo!')},
                    {text: 'Close', onPress:()=>console.log('done')}])}
                    >  {props.organization}</Text>
    <Text style={{alignItems: 'center'}, {fontSize: 18}}>{props.description}</Text>
    <Text style={styles.orgButton}> More info . . . </Text>
  </View>
);

/* This is a display of a specific orgs request, with an edit request button that allows one to
edit the request specified by the row and post that update to the server */
/*const OrgRow = (props) => (
   <View style={{padding: 10}}>
     <Text style={{fontSize: 20}}>  {props.title}</Text>
     <Text style={{alignItems: 'center'}, {fontSize: 18}}>  {props.description}</Text>
     <Text style={styles.orgButton} onPress=props.onPress> Edit Request </Text>
   </View>
)*/

class OrgRow extends Component {
    constructor(props) {
        super(props);
        // These are what is displayed, while the this.state variables are what the edit is set to
        this.title = props.title;
        this.description = props.description;

        this.state = {
          title: props.title,
          organization: props.organization,
          description: props.description,
          tags: props.tags,
          modalVisible: false,
        }
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
              <Button
                  style={styles.button}
                onPress={() => {Alert.alert('Update Successful', 'Sent your edited request.');
                    /* RIGHT HERE is where the update request method should go
                    but the functionality doesnt exist yet so i have not implemented it.
                    FOR THE CANCEL BUTTON BELOW: should removed the changes? can we do that?
                    makeRequest(this.state.requestName, this.state.requestDescription);
                    console.log("attempting to make request");*/
                    this.title = this.state.title;
                    this.description = this.state.description;
                    this.setModalVisible(!this.state.modalVisible);}}
                    tag='submitButton'>Submit Request</Button>
              <Button
                  style={styles.button}
                  onPress={() => {this.setModalVisible(!this.state.modalVisible);
                                  this.state.title = this.title;
                                  this.state.description = this.description;}}> Cancel
              </Button>
            </View>
          </Modal>
          <Text style={{fontSize: 20}}>  {this.title}</Text>
          <Text style={{alignItems: 'center'}, {fontSize: 18}}>{this.description}</Text>
          <Text style={styles.orgButton} onPress={() => {this.setModalVisible(true)}}>
                Edit Request </Text>
        </View>);
    }
}

/*<Text style={styles.orgButton} onPress= {()=>Alert.alert(props.title, props.description,
                                            [{text: 'Submit Edit', onPress: ()=>console.log('subscribe, yo!')},
                                            {text: 'Close', onPress:()=>console.log('done')}])}
                                            > Edit Request </Text>*/

// This component is a scrollable list of requests. Intially it will display a text that shows we
// are still waiting on the server to provide our requests, but once the request to the server has
// been completed the received requests will be displayed in the scrollable list.
export default class RequestFeed extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        startPage = [{
           "organization": "HandOff Team",
           "time": 7,
           "title": "Waiting on data",
           "description": "If this takes too long, check your internet connection.",
        }];

        this.organization = props.organization;

        // Sets the initial page to a loading page
        this.state = {
          dataSource: ds.cloneWithRows(startPage)
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

    render() {
      if (this.organization == null) {
         return (
            <View>
              <ListView
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
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <OrgRow {...rowData}/>}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                renderHeader={() => <Header />}
              />
            </View>
        );
      }
    }
}
