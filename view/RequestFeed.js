/* This will be a list that one can scroll through of requests, and clicking on individual
requests will display a pop up of the requests. The user will also be able to click on the
organization to go to the page of the organization. */

/*
        Things I need to do:
        1. Get a function call to get real data, which needs to be tranformed into requests
        2. Turn those requests into requestcomponents and put them in the bottom thing
        3. Figure out how to send variables through a callback
        4. make a compentent that i can both initialize and pass in props so that we dont have
        to hardcode the data for requests
        */
import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, TextInput,
            StyleSheet, AppRegistry, ListView, Text, View } from 'react-native';
//import Request from './Request';

// These are different styles
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

// Returns a promise
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

const Row = (props) => (
  <View style={{padding: 10}}>
    <Text style={{fontSize: 20}}>  {props.title}</Text>
    <Text style={{fontSize: 20}}>  {props.organization}</Text>
    <Text style={{alignItems: 'center'}, {fontSize: 18}}>  {props.description}
    </Text>
  </View>
);

export default class RequestFeed extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        requests = [{
           "organization": "HandOff Team",
           "time": 7,
           "title": "Waiting on data",
           "description": "Should be fetching requests, if this takes too long, check" +
               "your internet connection.",
        }];

        getRequests()
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log('title below');
                //console.log(responseJson.requests[0].title);
                //result = [responseJson.requests[0], responseJson.requests[1], responseJson.requests[3]];

                this.setState({
                  dataSource: ds.cloneWithRows(responseJson.requests)
                });
              })
              .catch((error) => {
                console.error(error);
        });

       this.state = {
            dataSource: ds.cloneWithRows(requests)
        }

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
