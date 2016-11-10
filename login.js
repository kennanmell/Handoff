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
      
// Facebook Log-In button.
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

export default class FacebookLoginPage extends Component {
     static propTypes = {
      onLogin:PropTypes.func.isRequired,
      orgTempLogin:PropTypes.func.isRequired
    }
  render() {
    return (
      <View>
        <Text style={{fontSize: 20, textAlign: 'center'}} onPress={ this.props.onLogin }>Please log in with Facebook in order to use Handoff.</Text>
        <Login style={{justifyContent:'center'}}/>
        <Text style={{fontSize: 15, textAlign: 'center'}} onPress={ this.props.orgTempLogin }>(click for temp organization login)</Text>
      </View>
    );
  }
}