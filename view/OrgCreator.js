/**
 * Organization Editor view class, which allows organizations
 * to change their profile information
 */

import Organization from '../model/Organization'
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import{Button} from 'native-base';

/*Builds a OrganizationCreator, which an Organization User uses upon
their first login to set up their organization's information to be
displayed to users. Has text boxes for theirorganization's name, 
description, and location. Has a save buttonto save changes, and a
continue button for when they are finished. */
export default class OrganizationCreator extends Component {
  static propTypes = {
      onContinue:PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
	this.org = new Organization("Hope Shelter", "1516 Brooklyn Ave",
							   "Providing a space for those in need", "password");
    this.state = {text: '',
				  typedName: this.org.name,
				  typedLoc: this.org.loc,
				  typedDesc: this.org.description,
				  typedPass: this.org.password
				};
  }
	
  render() {
    return (
		<View style={{padding: 10}}>
		<Text style={styles.editing}>
			Name
        </Text>
		<TextInput
			style={{height: 40}}
			onChangeText={(text) => this.setState({typedName: text})}
		/>
		
		<Text style={styles.editing}>
                    Location
        </Text>
		<TextInput
			style={{height: 40}}
			onChangeText={(text) => this.setState({typedLoc: text})}
		/>
		
		<Text style={styles.editing}>
                    Mission Statement
        </Text>
		<TextInput
			multiline={true}
			numberOfLines={4}
			style={{height: 90}}
			onChangeText={(text) => this.setState({typedDesc: text})}
		/>
		
		<Text style={styles.editing}>
                    Password
        </Text>
		<TextInput
			style={{height: 40}}
			onChangeText={(text) => this.setState({typedPass: text})}
		/>
		
		<Button
			onPress= {() => {this.org.name = this.state.typedName;
							 this.org.loc = this.state.typedLoc;
							 this.org.description = this.state.typedDesc;
							 this.org.password = this.state.typedPass;}}
			style={styles.button}> Save
		</Button>
		
		<Button style={styles.button} onPress={ this.props.onContinue }>Continue</Button>
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
  handoffButton: {
	fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    margin: 0,
	color: '#00cc99',
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