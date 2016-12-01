import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Navigator,
  View,
  Alert,
  NetInfo,
  TouchableHighlight,
} from 'react-native';
import Organization from '../model/Organization';
/**
The login screen. Allows organizations to log in, and for donators to access their feed/subscription.
*/
export default class FacebookLoginPage extends Component {
  static propTypes = {
    onOrgLogin:PropTypes.func.isRequired,
    onUserLogin:PropTypes.func.isRequired,
    onSubAccess:PropTypes.func.isRequired,
    onNoInternet:PropTypes.func.isRequired
  }
    
  constructor(props) {
    super(props);
    this.state = {text: '',
				  typedName: "a",
				  typedPass: "b"
	};
    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        this.props.onNoInternet
      }
    });
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
		<TouchableHighlight style={styles.button} onPress={ this.beforeOrgLogin.bind(this) }><Text style={{color:'#FFFFFF', textAlign:'center'}}>Login</Text></TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={ this.props.onOrgCreation }><Text style={{color:'#FFFFFF', textAlign:'center'}}>New Organization</Text></TouchableHighlight>
		    <TouchableHighlight style={styles.button} onPress={ this.props.onUserLogin }><Text style={{color:'#FFFFFF', textAlign:'center'}}>Donor Login</Text></TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={ this.props.onSubAccess}><Text style={{color:'#FFFFFF', textAlign:'center'}}>Subscriptions</Text></TouchableHighlight>
      </View>
    );
  }
  
  beforeOrgLogin() {
    window.org.name = this.state.typedName
    window.org.password = this.state.typedPass
	window.org.userName = this.state.typedName
          this.serverLogin()
              .then((response) => response.json())
              .then((responseJson) => {
            	  window.org.uuid = responseJson.uuid
            	  window.org.auth = responseJson.auth
            	  
            	  this.serverOrgData(window.org.uuid)
              		.then((response) => response.json())
              		.then((responseJson) => {
              		    if (responseJson != null && responseJson.info != null) {
              		  		window.org.name = responseJson.info.name
            	  			window.org.description = responseJson.info.description
            	  			window.org.loc = responseJson.info.location
            	  			if (window.org.description != null) {
        						// Login successful.
        						this.props.onOrgLogin()
        					}
              		    } else {
              		        Alert.alert('Login failed', 'Your username-password combination is invalid. Create a new account or email kmell96@gmail.com for help logging in.');
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
        marginLeft: 3,
        marginRight:3,
        marginTop: 10,
        borderWidth: 1,
        padding: 5,
        borderColor: 'black',
        marginBottom: 15,
        backgroundColor: '#642D64',
    }
});