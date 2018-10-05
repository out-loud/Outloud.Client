import React, { Component } from 'react';
import {AsyncStorage, Button, View} from 'react-native';
import Auth0 from 'react-native-auth0';
import {auth0 as auth0config} from '../configuration.json';

const auth0 = new Auth0({ 
  domain: auth0config.domain, 
  clientId: auth0config.clientId 
});

class Login extends Component {
  state = {isAuth: false}

  componentDidMount() {
    this.isAuthenticated().then(result => {
      this.setState({isAuth: result});
    });
  }

  isAuthenticated = async() => {
    const expiresAt = await AsyncStorage.getItem(`@User:expiresAt`);
    if (expiresAt == null)
      return false;
    const parsedExpireAt = JSON.parse(expiresAt);
    return new Date().getTime() < parsedExpireAt;
  }

  // async getUserItem(name) {
  //   try {
  //     const value = await AsyncStorage.getItem(`@User:${name}`);
  //     if (value !== null) {
  //       return value;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  
  login = async() => {
    auth0
    .webAuth
    .authorize({scope: 'token id_token', audience: auth0config.audience})
    .then(async (result) => {
      console.log(result);
      const expiresAt = JSON.stringify((result.expiresIn * 1000) + new Date().getTime());
      try {
        await AsyncStorage.setItem(`@User:accessToken`, result.accessToken);
        await AsyncStorage.setItem(`@User:expiresAt`, expiresAt);
      } catch (error) {
        console.log(error);
      }
      this.setState({isAuth: true});
    })
    .catch(error => console.log(error));
  }

  logout = async() => {
    this.setState({isAuth: false});
    await AsyncStorage.removeItem(`@User:accessToken`);
    await AsyncStorage.removeItem(`@User:expiresAt`);
    console.log("logged out");
  }

  render() {
    let button = this.state.isAuth ? <Button title="Logout" onPress={this.logout}/> : <Button title="Login" onPress={this.login}/>;
    console.log(this.state.isAuth);
    return (
      <View>
        {button}
      </View>
    );
  }
}

export default class LoginButton extends Component {
  render() {
    return (
        <Login/>
    );
  }
}