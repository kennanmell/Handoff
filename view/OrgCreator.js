/**
 * Organization Editor view class, which allows organizations
 * to change their profile information
 */

import Organization from '../model/Organization'
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Alert
} from 'react-native';

/*Builds a OrganizationCreator, which an Organization User uses upon
their first login to set up their organization's information to be
displayed to users. Has text boxes for the organization's name, 
description, and location. Also has text boxes for the user's
username and password. Has a save button create the organization, and a
continue button for when they are finished. */
export default class OrganizationCreator extends Component {
  static propTypes = {
      onContinue:PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
	this.org = new Organization("", "", "", "");
    this.state = {text: '',
				  typedName: this.org.name,
				  typedLoc: this.org.loc,
				  typedDesc: this.org.description,
				  typedPass: this.org.password,
				  typedUserName: this.org.userName
				};
  }
	
  render() {
    return (
		<View style={{padding: 10}}>
		   <View style={styles.container}>
              <Text style={styles.welcome}>
                            Register Your Organization
                          </Text>
          </View>
		<TextInput
			style={{height: 40}}
			placeholder="Organization Name"
			onChangeText={(text) => this.setState({typedName: text})}
		/>

		<TextInput
			style={{height: 40}}
			placeholder="Location"
			onChangeText={(text) => this.setState({typedLoc: text})}
		/>

		<TextInput
			multiline={true}
			numberOfLines={4}
			placeholder="Mission Statement"
			style={{height: 90}}
			onChangeText={(text) => this.setState({typedDesc: text})}
		/>

		<TextInput
			style={{height: 40}}
			placeholder="Username"
			onChangeText={(text) => this.setState({typedUserName: text})}
		/>

		<TextInput
			style={{height: 40}}
			placeholder="Password"
			onChangeText={(text) => this.setState({typedPass: text})}
		/>
		
		<TouchableHighlight
			onPress= {() => {this.org.name = this.state.typedName;
							 this.org.loc = this.state.typedLoc;
							 this.org.description = this.state.typedDesc;
							 this.org.password = this.state.typedPass;
							 this.org.userName = this.state.typedUsername;
							 window.org = this.org;
							 createOrg(this.state.typedName, this.state.typedLoc, this.state.typedDesc,
									this.state.typedUserName, this.state.typedPass)
								.then((response) => response.json())
								.then((responseJson) => {
									if (responseJson != null){
										this.org.uuid = responseJson.uuid;
										window.org.uuid = responseJson.uuid;
										console.log("uuid = ");
										console.log(responseJson.uuid);
										Alert.alert('Account created', 'Account creation successful.');
									} else {
										Alert.alert('Account not created', 'Something went wrong.');
									}
								})
								.catch((error) => {
									console.error(error);
								});
							}
					}
			style={styles.button}
			><Text style={{color:'#FFFFFF', textAlign:'center', fontSize: 18}}>Save</Text></TouchableHighlight>
		
		<TouchableHighlight style={styles.button} onPress={ this.props.onContinue }><Text style={{color:'#FFFFFF', textAlign:'center', fontSize: 18}}>Return to Log-In</Text></TouchableHighlight>
      </View>
		
    );
  }
}

/*Sends a request to the backend to make a new organization,
taking an organization name, location, description, a username,
and a password. */
async function createOrg(name, loc, description, username, pass) {
    return fetch('https://u116vqy0l2.execute-api.us-west-2.amazonaws.com/prod/organizations/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify({
            "name": name,
			"description": description,
			"location": loc,
			"username": username,
			"password": pass
      })
    })
}

const styles = StyleSheet.create({
  editing: {
	fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
    margin: 0,
	color: '#612e5f',
  },
  handoffButton: {
	fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    margin: 0,
	color: '#00cc99',
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
          padding: 2,
          borderColor: 'black',
          borderRadius: 3,
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
  });