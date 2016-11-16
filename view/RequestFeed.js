/* This will be a list that one can scroll through of requests, and clicking on individual
requests will display a pop up of the requests. The user will also be able to click on the
organization to go to the page of the organization. */

import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, TextInput,
            StyleSheet, AppRegistry, ListView, Text, View } from 'react-native';

// These are different styles that components use.
const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: 6,
    backgroundColor: '#C1C1C1',
  },
  container: {
      flex: 1,
      padding: 8,
      height: 70,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#C1C1C1',
  },
  input: {
      height: 50,
      flex: 1,
      paddingHorizontal: 8,
      fontSize: 25,
      backgroundColor: '#FFFFFF',
      borderRadius: 2,
  }
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
// a list of 30 requests.
async function getRequests() {
    return fetch('https://u116vqy0l2.execute-api.us-west-2.amazonaws.com/prod/requests', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          limit: 30,
      })
    })
}

// The row is a component that should have a title, organization, and description passed in as props
// This component will display these components.
const Row = (props) => (
  <View style={{padding: 10}}>
    <Text style={{fontSize: 20}}>  {props.title}</Text>
    <Text style={{fontSize: 20}}>  {props.organization}</Text>
    <Text style={{alignItems: 'center'}, {fontSize: 18}}>  {props.description}
    </Text>
  </View>
);

const OrgRow = (props) => (
   <View style={{padding: 10}}>
       <Text style={{fontSize: 20}}>  {props.title}</Text>
       <Text style={{fontSize: 20}}>  {props.organization}</Text>
       <Text style={{alignItems: 'center'}, {fontSize: 18}}>  {props.description}
       </Text>
   </View>
)

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
           "description": "Should be fetching requests, if this takes too long, check" +
               "your internet connection.",
        }];

        // Sets the initial page to a loading page
        this.state = {
          dataSource: ds.cloneWithRows(startPage)
        }

        // the .then statements will then handle the response
        // and update the listviews datasource once there is data to update it with.
        getRequests()
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
    }
}
