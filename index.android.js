/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import FacebookLoginPage from './login';
import OrganizationEditor from './javascripts/OrgEditor';
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Navigator,
  View
} from 'react-native';

/*Builds a RequestMaker - prompts user to type a request and has a text entry box*/
class RequestMaker extends Component {
    static propTypes = {
      onLogout:PropTypes.func.isRequired
    }
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (

      <View style={{padding: 10}}>
      <Text style={styles.welcome}>
                    Handoff
                  </Text>
        <TextInput
          style={{height: 40}}
          placeholder="Write your request"
          onChangeText={(text) => this.setState({text})}
        />
      </View>
    );
  }
}

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
    	
    		onLogin={ () => {
    			navigator.push({
    				name: 'MakeRequest',
    			})
    		}}
    		
    		orgTempLogin={ () => {
    			navigator.push({
    				name: 'OrgLoggedIn',
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
    	/>
    }
    
    if (route.name == 'OrgLoggedIn') {
    	return <OrganizationEditor
    	    onSave={ () => {
    			navigator.pop()
    		}}
    	/>
    }
  }
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

AppRegistry.registerComponent('MainNavigator', () => MainNavigator);
