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

/**
The login screen. Allows organizations to log in, and for donators to access their feed/subscription.
*/
export default class NoInternetView extends Component {
    render() {
    	return (
      		<View>
        		<Text style={{fontSize: 20, textAlign: 'center'}}>You must be connected to the Internet to use Handoff.</Text>
      		</View>
    	);
  	}
}