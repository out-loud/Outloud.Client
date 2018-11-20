import React, {Component} from 'react';
import {Image, View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import Voice from 'react-native-voice';


export default class Recognizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: false,
      pitch: false,
      error: false,
      end: false,
      started: false,
      results: [],
      partialResults: [],
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e) => {
    this.setState({
      started: true
    });
  }

  onSpeechEnd = (e) => {
    this.setState({
      end: true
    });
  }

  onSpeechRecognized = (e) => {
    this.setState({
      recognized: true
    });
  }

  onSpeechResults = (e) => {
    this.setState({
      results: e.value
    });
    console.log(this.state.results)
    // compareResults();
  }

  _startRecognizing = async(e) => {
    this.setState({
      started: true,
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }

  _stopRecognizing = async(e) => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this._startRecognizing.bind(this)}>
          <Image
            style={styles.button}
            source={require('../../../resources/button.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={this._stopRecognizing.bind(this)}>
          <Text
            style={styles.action}>
            Stop Recognizing
          </Text>
        </TouchableHighlight>
        {this.state.results.map((result, index) => {
          return (
            <Text
              key={`result-${index}`}
              style={styles.stat}>
              {result}
            </Text>
          )
        })}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
});