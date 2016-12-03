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
  Image,
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
      <View style={styles.allContent}>
      <View>
        <View style={styles.box}>
            <Text style={{fontSize: 20, textAlign: 'center', color:"#000000"}}>Organizations</Text>
            <TextInput
                style={{height: 40}}
                placeholder="Username"
                onChangeText={(text) => this.setState({typedName: text})}
            />
            <TextInput
                style={{height: 40}}
                placeholder="Password"
                onChangeText={(text) => this.setState({typedPass: text})}
            />
            <TouchableHighlight style={styles.button} onPress={ this.beforeOrgLogin.bind(this) }><Text style={{color:'#FFFFFF', textAlign:'center', fontSize: 18}}>Login</Text></TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={ this.props.onOrgCreation }><Text style={{color:'#FFFFFF', textAlign:'center', fontSize: 18}}>New Organization</Text></TouchableHighlight>

        </View>
        <View style={styles.box}>
            <Text style={{fontSize: 20, textAlign: 'center', color:"#000000"}}>Donors</Text>
            <TouchableHighlight style={styles.button} onPress={ this.props.onUserLogin }><Text style={{color:'#FFFFFF', textAlign:'center', fontSize: 18}}>See Local Requests</Text></TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={ this.props.onSubAccess}><Text style={{color:'#FFFFFF', textAlign:'center', fontSize: 18}}>Subscriptions</Text></TouchableHighlight>
        </View>
      </View>
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
        marginLeft: 5,
        marginRight:5,
        marginTop: 10,
        borderWidth: 1,
        padding: 2,
        borderColor: 'black',
        borderRadius: 3,
        backgroundColor: '#642D64',
    },
    container: {
         justifyContent: 'center',
         alignItems: 'center',

    },
    image: {
       width: 288,
       height: 172,
       flex:1

    },
    box: {
        marginTop: 10,
        marginBottom: 20,
        borderColor: "#999999",
        borderRadius: 4,
        borderWidth: 2,
        marginLeft: 3,
        marginRight: 3,
        padding: 5,

    },
  allContent: {
    flex:1
  }


});