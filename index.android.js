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
  View,
  TouchableNativeFeedback,
  Modal,
  TouchableHighlight,
  Navigator
} from 'react-native';
import Request from './Request';
import RequestFeed from './RequestFeed';

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
          placeholder="Give your request a snappy title"
          onChangeText={(text) => this.setState({text})}
        />
         <TextInput
                  style={{height: 40}}
                  placeholder="Provide details on what you are requesting"
                  onChangeText={(text) => this.setState({text})}
                />
         <TextInput
                  style={{height: 40}}
                  placeholder="Tag your request with keywords so people can find it"
                  onChangeText={(text) => this.setState({text})}
                />
        <TouchableNativeFeedback
                    style={styles.button}
                    >
                    <View>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </View>
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback
                              style={styles.button}
                              >
                              <View>
                                  <Text style={styles.buttonText}>Edit Request</Text>
                              </View>
                            </TouchableNativeFeedback>
      </View>
    );
  }
}

class EditRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (

      <View style={{padding: 10}}>
      <Modal
        animationType={"slide"}
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {alert("Modal has been closed.")}}
       >
       <View style={{marginTop: 22}}>
                 <View>
                   <Text>Hello World!</Text>
                    <TouchableHighlight onPress={() => {
                                  this.setModalVisible(false)
                                }}>
                                  <Text>Hide Modal</Text>
                                </TouchableHighlight>
                 </View>
                </View>
               </Modal>
               <TouchableHighlight onPress={() => {
                         this.setModalVisible(true)
                       }}>
                         <Text>Show Modal</Text>
                       </TouchableHighlight>
      <Text style={styles.welcome}>
                    Handoff
                  </Text>
        <Text style={styles.instructions}>
                  Request Feed Goes Here
                </Text>
		</View>
    );
  }
}


class ViewRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (

      <View style={{padding: 10}}>
      <Modal
        animationType={"slide"}
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {alert("Modal has been closed.")}}
       >
       <View style={{marginTop: 22}}>
                 <View>
                   <Text>Hello World!</Text>
                    <TouchableHighlight onPress={() => {
                                  this.setModalVisible(false)
                                }}>
                                  <Text>Hide Modal</Text>
                                </TouchableHighlight>
                 </View>
                </View>
               </Modal>
               <TouchableHighlight onPress={() => {
                         this.setModalVisible(true)
                       }}>
                         <Text>Show Modal</Text>
                       </TouchableHighlight>
      <Text style={styles.welcome}>
                    Handoff
                  </Text>
        <Text style={styles.instructions}>
                  Request Feed Goes Here
                </Text>
      </View>
    );
  }
}

class MainNavigator extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'RequestFeed' }}
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
<<<<<<< Updated upstream
    
    if (route.name == 'OrgLoggedIn') {
    	return <OrganizationEditor
    	    onSave={ () => {
    			navigator.pop()
    		}}
    	/>
=======
    if (route.name == 'RequestFeed') {
        return <RequestFeed
            onLogout={ () => {
                navigator.push({
                    name: 'Login',
                })
            }}
        />
>>>>>>> Stashed changes
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
