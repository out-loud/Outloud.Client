import React from 'react'
import {Button, View} from 'react-native'
import Auth0 from 'react-native-auth0';
import {auth0 as auth0config} from '../configuration.json'

const auth0 = new Auth0({ 
  domain: auth0config.domain, 
  clientId: auth0config.clientId 
});

const AuthComponent = props => {
  login = () => {
    auth0
    .webAuth
    .authorize({scope: 'openid profile email', audience: `https://${auth0config.domain}/userinfo`})
    .then(credentials =>
      console.log(credentials)
      // Successfully authenticated
      // Store the accessToken
    )
    .catch(error => console.log(error));
  }
  return(
    <View>
      <Button title="Login" onPress={this.login}/>
    </View>
  );
}

export default AuthComponent;