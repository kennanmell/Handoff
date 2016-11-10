import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Navigator,
  View
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;
      
// Facebook Log-In button. Based on Facebook's example code.
var Login = React.createClass({
  render: function() {
    return (
      <View>
        <LoginButton
          publishPermissions={["public_profile"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
});

/**
The login screen. Allows the user to log in with Facebook. Currently offers dummy log-in buttons to allow access
to the rest of the app.
*/
export default class FacebookLoginPage extends Component {
     static propTypes = {
      onOrgLogin:PropTypes.func.isRequired,
      onUserLogin:PropTypes.func.isRequired
    }
  render() {
    return (
      <View>
        <Text style={{fontSize: 20, textAlign: 'center'}}>Please log in with Facebook in order to use Handoff.</Text>
        <Login style={{justifyContent:'center'}}/>
        <Text style={{fontSize: 15, textAlign: 'center'}} onPress={ this.props.onOrgLogin }>(click for temp organization login)</Text>
        <Text style={{fontSize: 15, textAlign: 'center'}} onPress={ this.props.onUserLogin }>(click for temp user login)</Text>
      </View>
    );
  }
}