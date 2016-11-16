/**
 * Request Maker view class, which allows organizations
 * to make submit requests
 */


import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableNativeFeedback,
  Modal,
  TouchableHighlight,
  Navigator
} from 'react-native';
import{Button} from 'native-base';

/*Builds a RequestMaker, which an Organization User uses to
submit requests. Has text boxes for the request title, description,
and tags. Acts as initial page for orgs. Has a button to submit requests,
edit org profile, edit previous requests and logout.*/
export default class RequestMaker extends Component {
    static propTypes = {
      onLogout:PropTypes.func.isRequired,
      onEditRequest:PropTypes.func.isRequired,
      onEditProfile:PropTypes.func.isRequired
    }
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (

      <View style={{padding: 10}}>
      <Text style={styles.welcome}>
                    Handoff
                  </Text>
        <TextInput
          style={{height: 40}}
          placeholder="Give your request a snappy title"
          onChangeText={(text) => this.setState({text})}
        />
         <TextInput
                  style={{height: 40}}
                  placeholder="Provide details on what you are requesting"
                  onChangeText={(text) => this.setState({text})}
                />
         <TextInput
                  style={{height: 40}}
                  placeholder="Tag your request with keywords so people can find it"
                  onChangeText={(text) => this.setState({text})}
                />
        <Button style={styles.button}>Submit Request</Button>
        <Button style={styles.button} onPress={this.props.onEditProfile} >Edit Profile</Button>
        <Button style={styles.button} onPress={this.props.onEditRequest}>Edit Requests</Button>
        <Button style={styles.button} onPress={this.props.onLogout} > Logout </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

    button: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginLeft: 3,
          marginTop: 10,
          borderWidth: 1,
          padding: 5,
          borderColor: 'black',
          marginBottom: 15,
          backgroundColor: '#642D64',
      }
});