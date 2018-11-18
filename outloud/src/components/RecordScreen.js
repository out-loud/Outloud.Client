import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import Recognizer from './speech/Recognizer';

class RecordScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        {/* <VoiceTest/> */}
        <Recognizer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default RecordScreen;