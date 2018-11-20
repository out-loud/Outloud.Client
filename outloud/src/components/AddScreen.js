import React, {Component} from 'react';
import {
  View
} from 'react-native';
import { Button } from 'react-native-material-ui';

class AddScreen extends Component {
  render() {
    return (
      <View>
        <Button raised primary text="Category" onPress={() => this.props.navigation.navigate("ModifyItem", {itemType: 'category'})} /> 
        <Button raised accent text="Quiz" onPress={() => this.props.navigation.navigate("ModifyItem", {itemType: 'quiz'})} /> 
        <Button raised primary text="Word" onPress={() => this.props.navigation.navigate("ModifyItem", {itemType: 'words'})} /> 
      </View>
    )
  }
}

export default AddScreen;