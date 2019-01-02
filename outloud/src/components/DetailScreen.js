import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import BottomNav from './navigation/BottomNav';

class DetailScreen extends Component {
  render () {
    return (
        <BottomNav/>
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

export default DetailScreen;