import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import OfflineNotice from './OfflineNotice';
import QuizData from './QuizData';

class MainPage extends Component {
  render () {
    return (
      <View style={styles.container}>
        <OfflineNotice/>
        <QuizData/>
        <Button onPress={() => this.props.navigation.navigate("Detail")} title="Detail Page" />
        <Button onPress={() => this.props.navigation.navigate("Categories")} title="Start" />
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

export default MainPage;