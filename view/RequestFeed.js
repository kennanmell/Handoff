/* This will be a list that one can scroll through of requests, and clicking on individual
requests will display a pop up of the requests. The user will also be able to click on the
organization to go to the page of the organization. */

import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, TextInput, Alert, Modal, AsyncStorage,
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
      fontSize: 20,
      backgroundColor: '#FFFFFF',
      borderRadius: 2,
  },
    orgButton: {
        flexDirection: 'column',
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
class Header extends Component {
    constructor(props) {
        super(props);
        this.listView = props.listView;
        this.state = {text: ""};
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                  style={styles.input}
                  placeholder="Add Space Separated Keywords"
                  onChangeText={(text) => this.setState({text: text})}
                />
                <TouchableHighlight style={styles.orgButton}
                                    onPress={() =>
                                        {this.listView.setTags(this.state.text.split(" ")
                                            .filter(function(n){return n != "" }));
                                        }
                                    }
                >
                    <Text style={{color:'#FFFFFF',
                                  textAlign:'center',
                                  fontSize: 20}}> Search </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

// This function contacts the server and returns a promise of a response for the query. Takes in
// a type which is a string to append to the url of our AWS server, specified by the backend api.
// params is the body of the HTTP message sent to the server.
function fetchInfo(type, params) {
    console.log()
    return fetch('https://u116vqy0l2.execute-api.us-west-2.amazonaws.com/prod/' + type, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: params
    })
}

// This method returns a Promise that will at some point, probably very quickly return
// a list of 30 requests. Passed organization is a string to filter by, if null it will return
// all requests.
async function getRequests(organization, tags, listView) {
    params = null;
    listOfOrg = [organization];
    console.log('getting requests, next is tags');
    console.log(tags);
    if (organization != null && tags == []) {
        params = JSON.stringify({ limit: 30, organizations: listOfOrg});
    } else if (organization != null) {
        params = JSON.stringify({ limit: 30, organizations: listOfOrg, tags: tags});
    } else if (tags != []) {
        console.log("case1");
        console.log(tags);
        params = JSON.stringify({ limit: 30, tags: tags});
    } else {
        console.log("case2");
        params = JSON.stringify({ limit: 30});
    }
    console.log(params);
    fetchInfo('requests', params)
        .then((response) => response.json())
        .then((responseJson) => {
            listView.setState({
                dataSource: listView.ds.cloneWithRows(responseJson.requests)
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

// This class is a display of the individual requests and will provide buttons to see more info
// about either the request or the organization that posted it.
const RequestRow = (props) => (
  <View style={{padding: 10}}>
      <Text style={{fontSize: 20}}>  {props.title}</Text>
      <TouchableHighlight style={styles.orgButton}
          onPress={()=> fetchInfo('organizations/info',
                                  JSON.stringify({uuid: props.organization}))
                            .then((response) => response.json())
                            .then((responseJson) => { Alert.alert('Organization Info',
                                                      "Name: " + responseJson.info.name +
                                                          "\nLocation: " +
                                                          responseJson.info.location,
                                                      [{text: 'Subscribe',
                                                          onPress: ()=>
                                                              {checkSub(responseJson.info.name, props.organization)}},
                                                       {text: 'Close',
                                                          onPress:()=>console.log('done')}
                                                      ])
                            })
                            .catch((error) => {
                                console.error(error);
                            })}>
          <Text style={{color:'#FFFFFF', textAlign:'center'}}>{props.organization_name}</Text>
          </TouchableHighlight>
          <Text style={{alignItems: 'center'}, {fontSize: 18}}>{props.description}</Text>
  </View>
);

// This method checks to see if the user has already subscriped to it, and if not then adds the sub
function checkSub(orgName, uuid) {
        AsyncStorage.getItem('subNames')
            .then((value) => {console.log(value);
            				  list = JSON.parse(value)
            				  found = false
            				  for (var i = 0; i < list.length; i++) {
    							dict = list[i]
    							str = dict["organization"]
    							if (str === orgName) {
    								found = true
    								break
    							}
							  }

							  if (!found) {
							    list.push({"organization": orgName, "uuid": uuid})
            				  	AsyncStorage.setItem('subNames', JSON.stringify(list))
							  }
                             }
            )
}

// This method will create update the request for the request that the orgrow represents,
// takes in a boolean to indicate whether to edit or delete the request, true means edit.
async function updateRequest(edit) {
    params = null;
    if (!edit) {
        params = JSON.stringify({organization: window.org.uuid,
                                 time: window.requestToEditTime,
                                 username: window.org.userName,
                                 auth: window.org.auth})
    } else {
        params = JSON.stringify({organization: window.org.uuid,
                                 time: window.requestToEditTime,
                                 title: window.requestToEditTitle,
                                 description: window.requestToEditDescription,
                                 tags: window.requestToEditTags,
                                 username: window.org.userName,
                                 auth: window.org.auth})
    }
    console.log("got as far as attempting to update")
    console.log(params)
    return fetchInfo('requests/update', params)
         .then((response) => response.json())
         .then((responseJson) => {
              console.log(responseJson);
         })
}

/* This class represents an request by a specific organization, and will display a button that will
allow the organization to edit the request.
*/
const OrgRequestRow = (props) => (
    <View style={{padding: 10}}>
        <Text style={{fontSize: 20}}>  {props.title}</Text>
        <Text style={{alignItems: 'center'}, {fontSize: 18}}>{props.description}</Text>
        <TouchableHighlight style={styles.orgButton}
                            onPress={() => {window.requestToEditTitle = props.title;
                                            window.requestToEditDescription = props.description;
                                            window.requestToEditTags = props.tags;
                                            window.requestToEditTime = props.time;
                                            window.requestToEditUpdateRequest = props.updateRequest;
                                            props.onEditRequest()}}>
            <Text style={{color:'#FFFFFF', textAlign:'center'}}>Edit Request </Text>
        </TouchableHighlight>
    </View>
)

// This component is a scrollable list of requests. Intially it will display a text that shows we
// are still waiting on the server to provide our requests, but once the request to the server has
// been completed the received requests will be displayed in the scrollable list, with buttons for
// more information.
export default class RequestFeed extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.onEditRequest = props.onEditRequest;
        this.organization = props.uuid; // this is uuid, not organization name
        this.isOrg = props.isOrg;

        this.tags = [];

        // Sets the initial page to a blank page
        this.state = {
            dataSource: this.ds.cloneWithRows([])
        }

        getRequests(this.organization, this.state.tags, this)
    }

    // This takes in a list of tags and updates the requests with them
    setTags(listOfTags) {
        this.tags = listOfTags;
        getRequests(this.organization, this.tags, this);
    }

    render() {
        if (!this.isOrg) {
           return (
               <View>
                   <ListView
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => <RequestRow {...rowData} />}
                        renderSeparator={(sectionId, rowId) =>
                            <View key={rowId} style={styles.separator} />}
                        renderHeader={() => <Header listView={this}/>}
                   />
               </View>
           );
        } else {
            return (
                <View>
                    <ListView
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => <OrgRequestRow {...rowData}
                                                                onEditRequest={this.onEditRequest}
                                                                updateRequest={updateRequest}/>}
                        renderSeparator={(sectionId, rowId) =>
                            <View key={rowId} style={styles.separator} />}
                        renderHeader={() => <Header listView={this}/>}
                    />
                </View>
            );
        }
    }
}
