import React from 'react'
import {Button, View} from 'react-native'
import {AsyncStorage} from 'react-native';
import Auth0 from 'react-native-auth0';
import {auth0 as auth0config} from '../configuration.json';

const auth0 = new Auth0({ 
  domain: auth0config.domain, 
  clientId: auth0config.clientId 
});

const jwtDecode = require('jwt-decode');

const UserDataComponent = () => {
  getData = async () => {
    throw 'Test exception2';
    // try {
    //   let response = await fetch(
    //     'http://10.0.2.2:5002/api/values'
    //   );
    //   let responseJson = await response.json();
    //   console.log(responseJson);
    // } catch (error) {
    //   console.error(error);
    // }
  }

  saveData = async() => {
    try {
      let token = await this.getAccessToken();
      console.log(token);
      let response = await fetch('http://10.0.2.2:5002/api/values', {
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
    } catch (error) {
      console.error(error);
    }
  }

  login = () => {
    auth0
    .webAuth
    .authorize({scope: 'token id_token', audience: auth0config.audience})
    .then(result => {
      console.log(result);
      const expiresAt = JSON.stringify((result.expiresIn * 1000) + new Date().getTime());
      this.storeUserItem('accessToken', result.accessToken);
      this.storeUserItem('expiresAt', expiresAt);
    })
    .catch(error => console.log(error));
  }

  logout = async () => {
    await this.removeUserItem('accessToken');
    await this.removeUserItem('expiresAt');
    console.log("logged out")
  }

  removeUserItem = async (name) => {
    try {
      await AsyncStorage.removeItem(`@User:${name}`);
    } catch (error) {
      console.log(error);
    }
  }

  storeUserItem = async (name, value) => {
    try {
      await AsyncStorage.setItem(`@User:${name}`, value);
    } catch (error) {
      console.log(error);
    }
  }

  isInRole = async (roleName) =>  {
    const roles = await this.getUserRoles();
    return roles.indexOf(roleName) > -1;
  }

  getUserRoles = async () => {
    const token = await this.getDecodedToken();
    return token['http://api.outloud/roles'];
  }

  getDecodedToken = async () => {
    const accessToken = await this.getAccessToken();
    return jwtDecode(accessToken);
  }

  getUserItem = async (name) => {
    try {
      const value = await AsyncStorage.getItem(`@User:${name}`);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(error);
    }
  }

  getAccessToken = async () => {
    return await this.getUserItem('accessToken');
  }

  isAuthenticated = async () => {
    const expiresAt = await this.getUserItem('expiresAt');
    if (expiresAt == null)
      return false;
    const parsedExpireAt = JSON.parse(expiresAt);
    return new Date().getTime() < parsedExpireAt;
  }

  return(
    <View>
      <Button title="Login" onPress={this.login}/>
      <Button title="Logout" onPress={this.logout}/>
      <Button title="Get Data" onPress={this.getData}/>
      <Button title="Save Data" onPress={this.saveData}/>
    </View>
  )
}

export default UserDataComponent;