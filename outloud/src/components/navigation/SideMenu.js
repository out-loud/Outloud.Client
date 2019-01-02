import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {AsyncStorage, ScrollView, Text, View} from 'react-native';
import LoginButton from '../LoginButton'
import Auth0 from 'react-native-auth0';
import {auth0 as auth0config} from '../../configuration.json';
import {api as apiConfig} from '../../proxy.json';

var jwtDecode = require('jwt-decode');

const auth0 = new Auth0({ 
  domain: auth0config.domain, 
  clientId: auth0config.clientId 
})

class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogged: false,
      userId: '',
      courses: [],
    }
    this.checkProfile()
  }
  
  getUrl = (endpoint) => {
    if (__DEV__)
      return `${apiConfig.dev}/${endpoint}`
    else
      return `${apiConfig.prod}/${endpoint}`
  }

  getProfile = async() => {
    let userId = await this.decodeToken()
    let apiUrl = this.getUrl('users')
    console.log(apiUrl)
    try {
      const res = await fetch(`${apiUrl}/${userId}`)
      const json = await res.json();
      console.log(json)
      this.setState({
        userId: json.id,
        courses: json.courses,
      })
    } catch (ex) {
      console.log(ex)
    }
  }

  checkProfile = () => {
    this.isAuthenticated().then(result => {
      this.setState({isLogged: result})
      this.getProfile().then(res => {
        this.setState({profile: res})
      })
    })
  }

  isAuthenticated = async() => {
    const expiresAt = await AsyncStorage.getItem(`@User:expiresAt`)
    if (expiresAt == null)
      return false;
    const parsedExpireAt = JSON.parse(expiresAt)
    return new Date().getTime() < parsedExpireAt
  }

  decodeToken = async() => {
    const token = await AsyncStorage.getItem(`@User:accessToken`)
    let decodedToken = jwtDecode(token)
    return decodedToken.sub
  }

  print = async() => {
    await this.decodeToken()
  }

  navigateToScreen = (route,params) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: params
    })
    this.props.navigation.dispatch(navigateAction)
    this.checkProfile()
  }

  render () {
    let courses = this.state.courses.map(item => (
      <View key={'view' + item.id}>
        <Text key={item.id} style={styles.navItemStyle} onPress={this.navigateToScreen('Record', {parentId: item.courseId})}>
          {item.displayName} {item.progress}
        </Text>
      </View>
    ))
    return (
      <View style={styles.container}>
        <LoginButton/>
        <ScrollView>
          <View>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Add')}>
              Add
            </Text>
          </View>
          {this.state.isLogged ? courses : <Text>Login to see your courses!</Text>}
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>Outloud</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;