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
import { Alert, Button, TouchableHighlight, TextInput,
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
        this.state = {

          dataSource: ds.cloneWithRows([
            {
               "organization": "Foood Bank",
               "time": 7,
               "title": "Need some of them dons",
               "description": "But for real tho if this works this is gonna be so hype like you" +
                 "dont even know yet. Dont pretend to be ready",
               "tags": ["food",]
            },
            {
               "organization": "Fooodie Banker",
               "time": 7,
               "title": "Lets goooooooooo",
               "description": "No you aren't ready. This shit works now.",
               "tags": ["food",]
            },
            {
               "organization": "Foood Bank",             // organization id
               "time": 7,                        // Unix time in ms
               "title": "Need some of them dons",
               "description": "Neymmmamamamamamamamamamamam and a good night to you too booooo" +
                 "helolololol neymare klsdfjksdkljfsjkl sdkjfjkfkdsj dfkjfdkj fdfd fd fd",
               "tags": ["food",]
            },
          ])
        };
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
