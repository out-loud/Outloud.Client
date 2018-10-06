import React, { Component } from "react";
import {AsyncStorage, Button, Text, View} from "react-native";

let apiUrl;

if (__DEV__) {
  apiUrl = 'http://10.0.2.2:5002/api/values';
} else {
  apiUrl = 'http://outloud.azurewebsites.net/api/values';
}

class Quiz extends Component {
  state = {status: 0}
  
  saveData = async() => {
    try {
      let token = await AsyncStorage.getItem(`@User:accessToken`);
      console.log(token);
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