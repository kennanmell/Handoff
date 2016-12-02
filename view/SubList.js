import React, { Component, PropTypes } from 'react';
import { AsyncStorage, TouchableHighlight, TextInput, Alert,
            StyleSheet, AppRegistry, ListView, Text, View } from 'react-native';


'use strict';

const styles = StyleSheet.create({
  toolbar:{
        backgroundColor:'#642D64',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row'
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        fontSize: 35,
        flex:1
    },
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
        }
});

orgList = [{"organization": "Hope Shelter"}, {"organization": 'Northwest Harvest'}, {"organization":'UW Food Bank'},
            {"organization": 'Roots Young Adult Shelter'}, {"organization": 'Sacred Heart Shelter'},
            {"organization": 'YouthCare'}, {"organization": 'Solid Ground'}, {"organization": 'Broadview Emergency Shelter'},
            {"organization": 'YWCA'}];

const Row = (props) => (
  <View style={{padding: 10}}>
    <Text style={styles.orgButton}
        onPress={()=>Alert.alert('Subscription Options', null,
                    //[{text: 'Subscribe', onPress: () => subOrg()},
                    // getOrgID needs to be able to get the ID for the org we are currently looking
                    // at the request of
                    [{text: 'Close', onPress:()=>console.log('done')},
                    {text: 'Unsubscribe', onPress:()=>console.log('Unsubscribed')},
                    //{text: 'Unsubscribe', onPress:()=> asyncStrorage.removeItem(**OrgID**)},
                    {text: 'Organization Page', onPress: ()=> console.log('Take me to org page, yo')}])}
                    >  {props.organization}</Text>
    <Text style={{alignItems: 'center'}, {fontSize: 18}}>  Local Seattle Homeless Shelter</Text>
  </View>
);

const OrgRow = (props) => (
   <View style={{padding: 10}}>
     <Text style={{fontSize: 20}}>  {props.title}</Text>
     <Text style={{alignItems: 'center'}, {fontSize: 18}}>  {props.description}</Text>
     <Text style={styles.orgButton} onPress={()=>Alert.alert('Organization Info', null,
                                            [{text: 'Subscribe', onPress: ()=>console.log('subscribe, yo!')},
                                            {text: 'Close', onPress:()=>console.log('done')}])}
                                            > Edit Request </Text>
   </View>
)


export default class SubList extends Component {
  constructor(props) {
    super(props);
    //orgList = [{"organization": "Hope Shelter"}]
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    AsyncStorage.getItem('subNames').then((value) => {
    	orgList = [{"organization": "Hope Shelter"}]
    	        // Sets the initial page to a loading page
        this.state = {
          data: ds.cloneWithRows([{"organization": "Hope Shelter"}]),
          test: 'hello'
        }

    })

    startPage = [{
      "organization": "HandOff Team",
      "time": 7,
      "title": "Waiting on data",
      "description": "Should be fetching requests, if this takes too long, check" +
      "your internet connection.",
    }];

    hello = [{
      "hdflj": 'dfadsfa',
    }]

    this.organization = null;
        if (props.organization != null) {
            this.organization = props.organization;
        }

        // Sets the initial page to a loading page
        this.state = {
          data: ds.cloneWithRows(orgList),
          test: 'hello'
        }

        // the .then statements will then handle the response
        // and update the listviews datasource once there is data to update it with.
        /*getSubscriptions(this.organization)
              .then((response) => response.json())
              .then((responseJson) => {
                  this.setState({
                    dataSource: ds.cloneWithRows(responseJson.requests)
                  });
                })
              .catch((error) => {
                console.error(error);
        });*/
  }


  render () {
    return (
      <View>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarTitle}>Subscriptions</Text>
        </View>
        <ListView
          dataSource={this.state.data}
          renderRow={(rowData) => <Row {...rowData} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </View>
    );
  }
}

// This method returns a Promise that will at some point, probably very quickly return
// a list of 30 requests. Passed organization is a string to filter by
/*async function getSubscriptions(organization) {
    params = null;
    if (false) {
        params = JSON.stringify({ limit: 30, organizations: [organization]})
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
}*/

/*async function subOrg() {
  try {
    // AsyncStorage.setItem(orgID, orgID);
    AsyncStorage.setItem('myKey', 'myValue');
    console.log("Added subscription");
  } catch (error) {
    console.log("Error subscribing");
  }
}

async function getOrg() {
  try {
    console.log("hi");
    AsyncStorage.getItem('myKey', (err, result) => {
      console.log("about to return");
      return result
    });
  } catch (error) {
    console.log("Error getting subscribed to organization");
  }
  console.log("end of function");
}*/
