import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Button } from 'react-native-material-ui';
import {api as apiConfig} from '../../proxy.json';

class ModifyItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemType: this.props.navigation.state.params.itemType
    }
  }

  getUrl(itemType) {
    if (__DEV__)
      return `${apiConfig.dev}/${itemType}`;
    else
      return `${apiConfig.prod}/${itemType}`;
  }

  getNextItemType(itemType) {
    if (itemType == 'category')
      return 'quiz'
    if (itemType == 'quiz')
      return 'words'
    else
      return null
  }

  componentWillMount() {
    this.load(null);
  }

  load(id) {
    let apiUrl = this.getUrl(this.state.itemType)
    if (id)
      apiUrl += `/${id}`
    console.log(apiUrl);
    let nextItemType = this.getNextItemType(this.state.itemType);
    try {
      fetch(apiUrl)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          items: responseJson,
          itemType: nextItemType
        })
      });
    } catch (error) {
      console.error(error);
    }
  }

  loadNext = (id) => {
    this.setState({
      items: []
    });
    this.load(id);
  }

  render() {
    let buttonItems;
    console.log(this.state.items.length)
    if (this.state.items.length)
      buttonItems = this.state.items.map(item => (
        <Button raised primary text={item.name} onPress={() => this.loadNext(item.id)} key={item.id}/>
    ));

    return (
      <View>
        {buttonItems}
      </View>
    )
  }
}

export default ModifyItemScreen;