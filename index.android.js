/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import FacebookLoginPage from './view/login';
import OrganizationEditor from './view/OrgEditor';
import OrganizationCreator from './view/OrgCreator';
import RequestMaker from './view/RequestMaker';
import EditRequests from './view/EditRequests';
import ViewRequests from './view/ViewRequests';
import RequestFeed from './view/RequestFeed';
import Request from './model/Request';
import Organization from './model/Organization';

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

//to store a reference to the navigator to use for event listeners
var _navigator;

/**
The main navigation class for the Handoff app. Decides which scene to render with the
renderScene function, and this function contains a possible if-case for each scene the
user can navigate to. This class is responsible for setting up navigation between
all scenes, typically by providing callback functions for each button press that
triggers navigation.
*/
class MainNavigator extends Component {
  render() {
	return (<Navigator
				initialRoute={{ name: 'Login' }}
				renderScene={ this.renderScene }
			/>);
  }

  renderScene(route, navigator) {
	_navigator = navigator;
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
			
			onOrgCreation={ () => {
    			navigator.push({
    				name: 'OrgCreateProfile',
    			})
    		}}
    	/>
    }
    if (route.name == 'MakeRequest') {
    	return <RequestMaker
    		onLogout={ () => {
    			navigator.pop()
			}}
    		
    		onEditRequest={ () => {
    			navigator.push({
    				name: 'OrgViewRequests',
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
	
	if (route.name == 'OrgCreateProfile') {
    	return <OrganizationCreator
    	    onContinue={ () => {
				navigator.push({
					name: 'MakeRequest',
				})
    		}}
    	/>
    }
    
    if (route.name == 'OrgViewRequests') {
    	return <RequestFeed organization={window.org.name} />
    }
    
    if (route.name == 'UserFeed') {
    	return <RequestFeed />
    }
  }
}

//Add an event listener to handle android's back button
BackAndroid.addEventListener('hardwareBackPress', function() {
  if (_navigator.getCurrentRoutes().length > 1){
	  _navigator.pop();
  }
  return true;
});

window.org = new Organization(null, null, null, null);

// Register the main navigator so it will run when the app starts.
AppRegistry.registerComponent('MainNavigator', () => MainNavigator);
