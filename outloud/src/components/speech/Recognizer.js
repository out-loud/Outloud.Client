import React, {Component} from 'react';
import {Image, View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import Voice from 'react-native-voice';
import Snackbar from 'react-native-material-snackbar';
import {api as apiConfig} from '../../proxy.json';

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
      words: [],
      index: 0,
      points: 0,
      correct: true,
      parentId: props.navigation.state.params.parentId,
      progress: 0,
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }

  getUrl(endpoint) {
    if (__DEV__)
      return `${apiConfig.dev}/${endpoint}`;
    else
      return `${apiConfig.prod}/${endpoint}`;
  }

  componentWillMount() {
    let apiUrl = this.getUrl(`words/${this.state.parentId}`)
    try {
      fetch(apiUrl)
      .then(response => response.json())
      .then(responseJson => {
        let words = responseJson.map(x => x.name);
        this.setState({words: words})
      });
    }
    catch(ex) {
      console.log(ex);
    }
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
    this.compareResults()
  }

  showPopup = (success) => {
    if(success)
      Snackbar.show({
        title: 'Correct',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#F5FCFF',
        action: {
          title: 'yas babe',
          color: 'green',
          onPress: () => { Snackbar.dismiss },
        }
      });
    else
    Snackbar.show({
      title: 'U wrong n00b',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#F5FCFF',
      action: {
        title: 'OK :(',
        color: 'red',
        onPress: () => { Snackbar.dismiss },
      }
    });
  }

  compareResults = () => {
    let word = this.state.words[this.state.index];
    if (this.state.results[0].toLowerCase() === word.toLowerCase())
      this.showPopup(true)
    else {
      this.showPopup(false)
      this.setState({
        correct: false,
      })
    }
      
    let progress = (this.state.index + 1) / this.state.words.length
    this.setState({
      index: this.state.index + 1,
      progress
    })
  }

  _startRecognizing = async(e) => {
    this.setState({
      started: true,
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e)
    }
  }

  _stopRecognizing = async(e) => {
    try {
      await Voice.stop()
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    let word = this.state.words[this.state.index]
    return (
      <View style={styles.container}>
        <Text>Progress: {this.state.progress * 100}%</Text>
        <Text>Say: {word}</Text>
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
  container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
  },
  button: {
    width: 200,
    height: 200,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
});