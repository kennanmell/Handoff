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

/*Builds a RequestMaker - prompts user to type a request and has a text entry box*/
export default class RequestMaker extends Component {
    static propTypes = {
      onLogout:PropTypes.func.isRequired,
      onEditRequest:PropTypes.func.isRequired,
      onEditProfile:PropTypes.func.isRequired
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
                    style={{textAlign: 'center'}}
                    >
                    <View>
                        <Text style={styles.buttonText}>Submit Request</Text>
                    </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
                    style={styles.button}
                    onPress={this.props.onEditProfile}
                    >
                    <View>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </View>
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback
                              style={styles.button}
                              onPress={this.props.onEditRequest}
                              >
                              <View>
                                  <Text style={styles.buttonText}>Edit Request</Text>
                              </View>
                            </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                              style={styles.button}
                              onPress={this.props.onLogout}
                              >
                              <View>
                                  <Text style={styles.buttonText}>Logout</Text>
                              </View>
                            </TouchableNativeFeedback>
      </View>
    );
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