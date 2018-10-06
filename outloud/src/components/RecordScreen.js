import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import SpeechRecorder from './speech/SpeechRecorder'

class RecordScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <SpeechRecorder/>
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