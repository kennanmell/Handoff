/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import FacebookLoginPage from './view/login';
import OrganizationEditor from './view/OrgEditor';
import RequestMaker from './view/RequestMaker';
import EditRequests from './view/EditRequests';
import ViewRequests from './view/ViewRequests';
import RequestFeed from './view/RequestFeed';
import Request from './model/Request';

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
  BackAndroid,
  Navigator
} from 'react-native';

/**
The main navigation class for the Handoff app. Decides which scene to render with the
renderScene function, and this function contains a possible if-case for each scene the
user can navigate to. This class is responsible for setting up navigation between
all scenes, typically by providing callback functions for each button press that
triggers navigation.
*/
class MainNavigator extends Component {
  render() {
	
    return (
      <Navigator
        initialRoute={{ name: 'Login' }}
        renderScene={ this.renderScene }
      />
    )
  }

  renderScene(route, navigator) {
    if (route.name == 'Login') {
    	return <FacebookLoginPage
    	
    		onUserLogin={ () => {
    			navigator.push({
    				name: 'UserFeed',
    			})
    		}}
    		
    		onOrgLogin={ () => {
    			navigator.push({
    				name: 'MakeRequest',
    			})
    		}}
    	/>
    }
    if (route.name == 'MakeRequest') {
    	return <RequestMaker
    		onLogout={ () => {
    			navigator.push({
    				name: 'Login',
    			})
    		}}
    		
    		onEditRequest={ () => {
    			navigator.push({
    				name: 'OrgEditRequests',
    			})
    		}}
    		
    		onEditProfile={ () => {
    			navigator.push({
    				name:'OrgEditProfile',
    			})
    		}}
    	/>
    }

    if (route.name == 'OrgEditProfile') {
    	return <OrganizationEditor
    	    onSave={ () => {
    			navigator.pop()
    		}}
    	/>
    }
    
    if (route.name == 'OrgEditRequests') {
        return <EditRequests
        	onClose={ () => {
        		navigator.pop()
        	}}
         />
    }
    
    if (route.name == 'OrgViewRequests') {
    	return <ViewRequests />
    }
    
    if (route.name == 'UserFeed') {
    	return <RequestFeed />
    }
    
  }
}

BackAndroid.addEventListener('hardwareBackPress', function() {
  return true;
});

AppRegistry.registerComponent('MainNavigator', () => MainNavigator);
