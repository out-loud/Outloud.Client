import React, { Component } from 'react';
import {
  Modal,
  View
} from 'react-native';
import { ActionButton, Button, Toolbar } from 'react-native-material-ui';
import {api as apiConfig} from '../../proxy.json';

class ModifyItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemType: this.props.navigation.state.params.itemType,
      modalVisible: false
    }
  }

  getUrl(itemType) {
    if (__DEV__)
      return `${apiConfig.dev}/${itemType}`;
    else
      return `${apiConfig.prod}/${itemType}`;
  }

  getNextItemType(itemType) {
    if (!itemType)
      return 'category'
    if (itemType == 'category')
      return 'quiz'
    if (itemType == 'quiz')
      return 'words'
  }

  getPreviousItemType(itemType) {
    if (!itemType)
      return 'words'
    if (itemType == 'words')
      return 'quiz'
    if (itemType == 'quiz')
      return 'category'
  }

  componentWillMount() {
    this.load(null);
  }

  load(id) {
    if (this.state.itemType) {
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
  }

  loadPrevious = () => {
    if (this.state.parentId)
      this.load(this.parentId)
    else
      this.props.navigation.goBack()
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    let buttonItems;
    const itemType = this.getPreviousItemType(this.state.itemType)
    console.log(this.state.items.length)
    if (this.state.items.length)
      buttonItems = this.state.items.map(item => (
        <Button raised primary text={item.name} onPress={() => this.load(item.id)} key={item.id}/>
    ));

    return (
      <View style={{flex:1}}>
        <Toolbar
          leftElement="arrow-back"
          centerElement={`Search for a ${itemType}`}
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
          }}
          rightElement={{
            menu: {
              icon: "more-vert",
              labels: ["item 1", "item 2"]
            }
          }}
          onLeftElementPress={() => this.loadPrevious()}
          onRightElementPress={ (label) => { console.log(label) }}
        />
        {buttonItems}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false)
          }}>
            <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => this.setModalVisible(false)}
            centerElement={`Add a new ${itemType}`}
            />
        </Modal>
        <ActionButton />
        <ActionButton icon="add" onPress={() => this.setModalVisible(true)}/>
      </View>
    )
  }
}

export default ModifyItemScreen;