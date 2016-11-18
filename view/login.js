import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Navigator,
  View
} from 'react-native';
import{Button} from 'native-base';

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
        <Button style={styles.button} onPress={ this.props.onOrgLogin }>Login</Button>
        <Button style={styles.button} onPress={ this.props.onOrgCreation }>New Organization</Button>
		<Button style={styles.button} onPress={ this.props.onUserLogin }>I'm a donator</Button>
      </View>
    );
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