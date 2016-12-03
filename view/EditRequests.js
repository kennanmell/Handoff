/**
 * Edit Requests view class, which allows organizations to see
 * previous requests and edit them.
 */

import React, { Component, PropTypes } from 'react';
import {
  Alert,
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

/*Builds a EditRequests class, which an organization User uses to
select a request to edit and edit it in a pop-up. Has a RequestFeed
that the donor can interact with for more information in pop-ups.*/
export default class EditRequests extends Component {

  constructor(props) {
    super(props);
    this.onEditRequestClose = props.onEditRequestClose;
  }

  render() {
    var regex = new RegExp(',', 'g');
    return (
        <View style={{marginTop: 22}}>
            <Text style={styles.welcome}> Edit Your Request</Text>
            <TextInput
                style={{height: 40}}
                defaultValue={ window.requestToEditTitle}
                onChangeText={(text) => {window.requestToEditTitle = text}}
                tag='titleInput'
            />
            <TextInput
                style={{height: 40}}
                defaultValue={window.requestToEditDescription}
                onChangeText={(text) => {window.requestToEditDescription = text}}
                tag='detailsInput'
            />
            <TextInput
                style={{height: 40}}
                defaultValue={window.requestToEditTags.toString().replace(regex,' ')}
                tag='keywordsInput'
                onChangeText={(text) => {window.requestToEditTags = text.split(",")}}
            />
            <TouchableHighlight
                style={styles.button}
                    onPress={() =>
                        {Alert.alert('Update Successful', 'Sent your edited request.');
                         window.requestToEditUpdateRequest(true);
                         this.onEditRequestClose();}}
                tag='submitButton'>
                <Text style={{color:'#FFFFFF', textAlign:'center', fontSize: 18}}> Submit Edit</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.button}
                onPress={() =>
                    {Alert.alert('Update Successful', 'Sent your edited request.');
                     window.requestToEditUpdateRequest(false);
                     this.onEditRequestClose();}}
                     tag='submitButton'>
                <Text style={{color:'#FFFFFF', textAlign:'center', fontSize: 18}}> Delete Request</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.button}
                onPress={() => { this.onEditRequestClose();}}
                tag='submitButton'>
                <Text style={{color:'#FFFFFF', textAlign:'center', fontSize: 18}}> Cancel</Text>
            </TouchableHighlight>
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
  orgButton: {
      flexDirection: 'column',
      marginLeft: 3,
      marginTop: 3,
      marginRight: 3,
      borderWidth: 1,
      borderRadius: 5,
      padding: 3,
      borderColor: 'black',
      marginBottom: 3,
      backgroundColor: '#642D64',
  },
  welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button:{
    flexDirection: 'column',
    marginLeft: 5,
    marginRight:5,
    marginTop: 10,
    borderWidth: 1,
    padding: 5,
    borderColor: 'black',
    marginBottom: 15,
    borderRadius: 3,
    backgroundColor: '#642D64',
  }
});