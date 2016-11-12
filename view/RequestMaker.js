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
<<<<<<< HEAD
          onChangeText={(text) => this.setState({requestName: text})}
=======
          tag='titleInput'
          onChangeText={(text) => this.setState({text})}
>>>>>>> c1e68b23c4f22ee4b0efae912919729840ad7f3d
        />
         <TextInput
                  style={{height: 40}}
                  placeholder="Provide details on what you are requesting"
<<<<<<< HEAD
                  onChangeText={(text) => this.setState({requestDescription: text})}
=======
                  tag='detailsInput'
                  onChangeText={(text) => this.setState({text})}
>>>>>>> c1e68b23c4f22ee4b0efae912919729840ad7f3d
                />
         <TextInput
                  style={{height: 40}}
                  placeholder="Tag your request with keywords so people can find it"
<<<<<<< HEAD
                  onChangeText={(text) => this.setState({requestTags: text})}
                />
        <TouchableNativeFeedback
                    style={{textAlign: 'center'}}
					onPress={() => {makeRequest(this.state.requestName, this.state.requestDescription); console.log("attempting to make request"); }}
=======
                  tag='keywordsInput'
                  onChangeText={(text) => this.setState({text})}
                />
        <TouchableNativeFeedback
                    style={{textAlign: 'center'}}
                    tag='submitButton'
>>>>>>> c1e68b23c4f22ee4b0efae912919729840ad7f3d
                    >
                    <View>
                        <Text style={styles.buttonText}>Submit Request</Text>
                    </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
                    style={styles.button}
                    onPress={this.props.onEditProfile}
                    >
                    <View>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </View>
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback
                              style={styles.button}
                              onPress={this.props.onEditRequest}
                              >
                              <View>
                                  <Text style={styles.buttonText}>Edit Requests</Text>
                              </View>
                            </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                              style={styles.button}
                              tag='logoutButton'
                              onPress={this.props.onLogout}
                              >
                              <View>
                                  <Text style={styles.buttonText}>Logout</Text>
                              </View>
                            </TouchableNativeFeedback>
      </View>
    );
  }
}

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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});