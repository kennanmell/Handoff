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

/*Builds a OrganizationEditor, which an Organization User uses to
edit information about their organization. Has text boxes for their
organization's name, description, and location. Has a save button
to save changes. Currently the editor is loaded with dummy data */
export default class OrganizationEditor extends Component {
  static propTypes = {
      onSave:PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
	this.org = new Organization(window.org.name, "1516 Brooklyn Ave",
							   "Providing a space for those in need", window.org.password);
    this.state = {text: '',
				  typedName: this.org.name,
				  typedLoc: this.org.loc,
				  typedDesc: this.org.description
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
			defaultValue={this.state.typedName}
			onChangeText={(text) => this.setState({typedName: text})}
		/>
		
		<Text style={styles.editing}>
                    Location
        </Text>
		<TextInput
			style={{height: 40}}
			defaultValue={this.state.typedLoc}
			onChangeText={(text) => this.setState({typedLoc: text})}
		/>
		
		<Text style={styles.editing}>
                    Mission Statement
        </Text>
		<TextInput
			multiline={true}
			numberOfLines={4}
			style={{height: 90}}
			defaultValue={this.state.typedDesc}
			onChangeText={(text) => this.setState({typedDesc: text})}
		/>
		<TouchableHighlight
			onPress= {() => {this.org.name = this.state.typedName;
							 this.org.loc = this.state.typedLoc;
							 this.org.description = this.state.typedDesc;
							 this.props.onSave}}
			style={styles.button}
			><Text style={{color:'#FFFFFF'}}>Save</Text></TouchableHighlight>
		
		<TouchableHighlight style={styles.button} onPress={ this.props.onSave }><Text style={{color:'#FFFFFF'}}>Close</Text></TouchableHighlight>
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