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
      <View style={styles.billboard}>
      <Text style={styles.welcome}>
                    Create a Request
                  </Text>
       </View>
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
         <View style={styles.separate}>
        <TouchableHighlight
                    style={styles.button}
					onPress={() => {
					makeRequest(this.state.requestName, this.state.requestDescription, this.state.requestTags).then(function(){Alert.alert('Request Successful', 'Your request was successfully posted.')});
					console.log("attempting to make request"); }}
                    tag='submitButton'>
                    <Text style={{color:'#FFFFFF', textAlign:'left', textAlign:'center', fontSize: 18}}>Submit Request</Text>
                    </TouchableHighlight>
                    </View>
        <View style={styles.bottomButton}>
        <TouchableHighlight
                    style={styles.button}
                    onPress={this.props.onEditProfile}>
                    <Text style={{color:'#FFFFFF', textAlign:'center', fontSize: 18}}>Edit Profile</Text>
                    </TouchableHighlight>
        <TouchableHighlight
                    style={styles.button}
                    onPress={this.props.onEditRequest}>
                    <Text style={{color:'#FFFFFF', textAlign:'center', fontSize: 18}}>Edit Requests</Text>
                    </TouchableHighlight>
        <TouchableHighlight
                  style={styles.button}
                  tag='logoutButton'
                  onPress={this.props.onLogout}>
                  <Text style={{color:'#FFFFFF', textAlign:'center', fontSize: 18}}>Logout</Text>
                  </TouchableHighlight>
        </View>
      </View>
    );
  }
}

/* Given a requestName and a requestDescription, creates a request in the database.
For the moment, the request's organization and its tags are not modifiable. This functionality
will be added later.*/
async function makeRequest(requestName, requestDescription, tags) {
    console.log(window.org.name);
    console.log(requestName);
    console.log(window.org.userName);
    console.log(window.org.auth);
	var tagsArray = tags.split(" ");
	console.log(tagsArray);
    fetch('https://u116vqy0l2.execute-api.us-west-2.amazonaws.com/prod/requests/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
            "organization": window.org.uuid,
            "organization_name": window.org.name,
			"title": requestName,
	        "description": requestDescription,
			"tags": tagsArray,
			"username": window.org.userName,
			"auth": window.org.auth
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
    color:'white'
  },

    button: {
          flexDirection: 'column',
          marginLeft: 5,
          marginRight:5,
          marginTop: 10,
          borderWidth: 1,
          padding: 5,
          borderColor: 'black',
          marginBottom: 15,
          borderRadius: 3,
          backgroundColor: '#642D64',
      },
  separate: {
    marginBottom: 60,
  },
  billboard: {
              flex: 1,
              padding: 8,
              height: 70,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#642D64',
          },
});