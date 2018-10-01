import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import UserDataComponent from './UserDataComponent'

class MainPageComponent extends Component {
  render () {
    return (
      <View style={styles.container}>
        <UserDataComponent/>
        <Button onPress={() => this.props.navigation.navigate("Detail")} title="Detail Page" />
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

export default MainPageComponent;