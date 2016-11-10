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
import React, { Component } from 'react';
import { Alert, Button, TouchableHighlight, TextInput,
            StyleSheet, AppRegistry, ListView, Text, View } from 'react-native';

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

const Header = (props) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search..."
      onChangeText={(text) => console.log('searching for ', text)}
    />
  </View>
);

/*function Request(props) {
  return <h1>Hello, {props.name}</h1>;
};
const elem1 = <Request name="Help"/>;
const elem2 = <Request name="Help us"/>;
*/
/*
class RequestComp extends Component {
  constructor(props) {
    super(props);
    //this.request = new Request("Hell yeah", "descrip", "org", "Hell Yeah", ["stuff", "h"]);
    //this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
      <Text> Title: _______ Org: ________</Text>
      <Text> Text for the request should go here </Text>
      <Button
        onPress={onPressLearnMore}
        title="Learn More"
        color="#841584"
      />
      </View>
    );
  }
}


const elem1 = new RequestComp();
const elem2 = new RequestComp();*/
var Request = React.createClass ({
    render: function() {
        return (
            <View>
                <Text style={{fontSize: 20}}>  Title: ________</Text>
                <Text style={{fontSize: 20}}>  Org: ________</Text>
                <Text style={{alignItems: 'center'}, {fontSize: 18}}> Text for the request should
                    go here. It can talk about how we needs some donations or something just want
                    so get the format in here.
                </Text>
            </View>
        );
    }

    /* more info button that looks terrible
                <TouchableHighlight
                    //onPress= {Alert.alert('This should display the info of the organization')}
                    underlayColor={'#612e5f'}>
                    <Text style={{alignSelf: 'flex-end'},{fontSize: 15}}>More Info</Text>
                </TouchableHighlight>*/
});

export default class RequestFeed extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {

          dataSource: ds.cloneWithRows([
            <Request/>, <Request/>, <Request/>, <Request/>,
            <Request/>, <Request/>, <Request/>, <Request/>,
            <Request/>, <Request/>, <Request/>, <Request/>
          ])
        };
    }

    render() {
      return (
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Request>{rowData}</Request>}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            renderHeader={() => <Header />}
          />
        </View>
      );
    }
}
