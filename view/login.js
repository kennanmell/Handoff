import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Navigator,
  View,
  TouchableHighlight,
} from 'react-native';
import Organization from '../model/Organization';
/**
The login screen. Allows the user to log in with Facebook. Currently offers dummy log-in buttons to allow access
to the rest of the app.
*/
export default class FacebookLoginPage extends Component {
  static propTypes = {
    onOrgLogin:PropTypes.func.isRequired,
    onUserLogin:PropTypes.func.isRequired,
    onSubAccess:PropTypes.func.isRequired
  }
    
  constructor(props) {
    super(props);
    this.state = {text: '',
				  typedName: "a",
				  typedPass: "b"
	};
  }
  render() {
    return (
      <View>
        <Text style={{fontSize: 20, textAlign: 'center'}}>Handoff Login</Text>
        <Text style={styles.editing}>
			Name
        </Text>
		<TextInput
			style={{height: 40}}
			onChangeText={(text) => this.setState({typedName: text})}
		/>
        <Text style={styles.editing}>
        	Password
        </Text>
		<TextInput
			style={{height: 40}}
			onChangeText={(text) => this.setState({typedPass: text})}
		/>
		<TouchableHighlight style={styles.button} onPress={ this.beforeOrgLogin.bind(this) }><Text style={{color:'#FFFFFF'}}>Login</Text></TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={ this.props.onOrgCreation }><Text style={{color:'#FFFFFF'}}>New Organization</Text></TouchableHighlight>
		    <TouchableHighlight style={styles.button} onPress={ this.props.onUserLogin }><Text style={{color:'#FFFFFF'}}>Donor Login</Text></TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={ this.props.onSubAccess}><Text style={{color:'#FFFFFF'}}>Subscriptions</Text></TouchableHighlight>
      </View>
    );
  }
  
  beforeOrgLogin() {
    window.org.name = this.state.typedName
    window.org.password = this.state.typedPass
          this.serverLogin()
              .then((response) => response.json())
              .then((responseJson) => {
            	  window.org.uuid = responseJson.uuid
            	  window.org.auth = responseJson.auth
            	  
            	  this.serverOrgData(window.org.uuid)
              		.then((response) => response.json())
              		.then((responseJson) => {
            	  		window.org.name = responseJson.info.name
            	  		window.org.description = responseJson.info.description
            	  		window.org.location = responseJson.info.location
            	  		if (window.org.description != null) {
        					// Login successful.
        					this.props.onOrgLogin()
        				}
                	})

                })
              .catch((error) => {
                console.error(error);
                })
  }
  
  async serverLogin() {
    return fetch('https://u116vqy0l2.execute-api.us-west-2.amazonaws.com/prod/authenticate', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username: window.org.name,
                                     password: window.org.password})
    })
  }
  
  async serverOrgData(uuid) {
    return fetch('https://u116vqy0l2.execute-api.us-west-2.amazonaws.com/prod/organizations/info', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ uuid: uuid })
    })
  }
}

const styles = StyleSheet.create({
  editing: {
	fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
    margin: 0,
	color: '#612e5f',
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