/**
 * View Requests view class, which allows donors to see
 * relevant requests.
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

/*Builds a ViewRequests class, which a donor User uses to
view relevant requests. Has a RequestFeed that the donor can interact with
for more information in pop-ups. */
export default class ViewRequests extends Component {
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
                      visible={false}
                      onRequestClose={() => {alert("Modal has been closed.")}}
          >
            <View style={{marginTop: 22}}>
             <View>
               <Text>Hello World!</Text>
               <TouchableHighlight onPress={() => {
                this.setModalVisible(false)
               }}> <Text>ClickMe!</Text>
                </TouchableHighlight>
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