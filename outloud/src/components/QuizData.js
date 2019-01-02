import React, { Component } from "react";
import {AsyncStorage, Button, Text, View} from "react-native";
import {api as apiConfig} from '../proxy.json';

let apiUrl;

if (__DEV__) {
  apiUrl = apiConfig.dev + '/api/values';
} else {
  apiUrl = apiConfig.prod + '/api/values';
}

class Quiz extends Component {
  state = {status: 0}
  
  saveData = async() => {
    try {
      let token = await AsyncStorage.getItem(`@User:accessToken`);
      console.log(token);
      console.log(apiUrl);
      let response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: 'data'
        })
      });
      let responseResult = await response;
      console.log(responseResult);
      this.setState({status: responseResult.status})
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    let message = '';
    if (this.state.status === 0)
      message = 'Not called'
    else if (this.state.status === 202)
      message = 'Accepted';
    else if (this.state.status === 401)
      message = 'Unauthorized'
    else
      message = 'Internal Server Error'
    return(
      <View>
        <Text>{message}</Text>
        <Button title='Save data' onPress={this.saveData}/>
      </View>
    )
  }
}

export default class QuizData extends Component {
  render() {
    return(
      <Quiz/>
    )
  }
}