import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import VoiceTest from './speech/VoiceTest'

class RecordScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <VoiceTest/>
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