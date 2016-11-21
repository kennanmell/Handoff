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
  Navigator,
  Alert
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
    this.state = {text: '',
				  requestName: '',
				  requestDescription: '',
				  requestTags: ''
				  };
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
          onChangeText={(text) => this.setState({requestName: text})}
          tag='titleInput'
        />
         <TextInput
                  style={{height: 40}}
                  placeholder="Provide details on what you are requesting"
                  onChangeText={(text) => this.setState({requestDescription: text})}
                  tag='detailsInput'
                />
         <TextInput
                  style={{height: 40}}
                  placeholder="Tag your request with keywords so people can find it"
                  tag='keywordsInput'
                  onChangeText={(text) => this.setState({requestTags: text})}
                />
        <Button
                    style={styles.button}
					onPress={() => {Alert.alert('Request Successful', 'Your request was successfully posted.');
					makeRequest(this.state.requestName, this.state.requestDescription);
					console.log("attempting to make request"); }}
                    tag='submitButton'
                    >Submit Request</Button>
        <Button
                    style={styles.button}
                    onPress={this.props.onEditProfile}
                    >Edit Profile</Button>
        <Button
                    style={styles.button}
                    onPress={this.props.onEditRequest}
                    >Edit Requests</Button>
        <Button
                  style={styles.button}
                  tag='logoutButton'
                  onPress={this.props.onLogout}
                  >Logout</Button>
      </View>
    );
  }
}

/* Given a requestName and a requestDescription, creates a request in the database.
For the moment, the request's organization and its tags are not modifiable. This functionality
will be added later.*/
async function makeRequest(requestName, requestDescription) {
    fetch('https://u116vqy0l2.execute-api.us-west-2.amazonaws.com/prod/requests/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
            "organization": "Hope Shelter",
			"time": 50,
			"title": requestName,
	        "description": requestDescription,
			"tags": ["food","test"]
      })
    })
	console.log("fetch maybe did something");
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