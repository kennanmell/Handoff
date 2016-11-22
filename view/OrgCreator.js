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
		<Text style={styles.editing}>
			Organization Name
        </Text>
		<TextInput
			style={{height: 40}}
			onChangeText={(text) => this.setState({typedName: text})}
		/>
		
		<Text style={styles.editing}>
                    Location
        </Text>
		<TextInput
			style={{height: 40}}
			onChangeText={(text) => this.setState({typedLoc: text})}
		/>
		
		<Text style={styles.editing}>
                    Mission Statement
        </Text>
		<TextInput
			multiline={true}
			numberOfLines={4}
			style={{height: 90}}
			onChangeText={(text) => this.setState({typedDesc: text})}
		/>
		
		<Text style={styles.editing}>
                    User Name
        </Text>
		<TextInput
			style={{height: 40}}
			onChangeText={(text) => this.setState({typedUserName: text})}
		/>
		
		<Text style={styles.editing}>
                    Password
        </Text>
		<TextInput
			style={{height: 40}}
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
										Alert.alert('Account created', 'Press continue to return to login screen');
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
			><Text style={{color:'#FFFFFF'}}>Save</Text></TouchableHighlight>
		
		<TouchableHighlight style={styles.button} onPress={ this.props.onContinue }><Text style={{color:'#FFFFFF'}}>Continue</Text></TouchableHighlight>
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