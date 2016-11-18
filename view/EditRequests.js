/**
 * Edit Requests view class, which allows organizations to see
 * previous requests and edit them.
 */

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
import{Button} from 'native-base';

/*Builds a EditRequests class, which an organization User uses to
select a request to edit and edit it in a pop-up. Has a RequestFeed
that the donor can interact with for more information in pop-ups.*/
export default class EditRequests extends Component {
  static propTypes = {
      onClose:PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {text: '', modalVisible:false};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (

    <View style={{padding: 10}}>

        <Button style={styles.button} onPress={() => {
                 this.setModalVisible(true)
               }}>Edit a Request</Button>
        <Text style={styles.welcome}> Handoff </Text>
        <Text style={styles.instructions}> Request Feed Goes Here </Text>
        <Modal
                        animationType={"slide"}
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {this.props.onClose}}
                >
                    <View style={{marginTop: 22}}>
                    <View>
                        <Text>Edit Request Here. Click Save When Done.</Text>
                         <Button save style={styles.button} onPress={() => { this.setModalVisible(!this.state.modalVisible)}}>Save</Button>
                        <Button close style={styles.button} onPress={this.props.onClose}> Cancel </Button>
                    </View>
                    </View>
                </Modal>
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