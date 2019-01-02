import React, {Component} from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-material-ui';
import {api as apiConfig} from '../proxy.json';

class CategoriesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }
  
  getUrl = (endpoint) => {
    if (__DEV__)
      return `${apiConfig.dev}/${endpoint}`
    else
      return `${apiConfig.prod}/${endpoint}`
  }

  componentDidMount() {
    apiUrl = this.getUrl('categories')
    console.log(apiUrl)
    try {
      fetch(apiUrl)
      .then(response => response.json())
      .then(responseJson => {
        let categories = []
        responseJson.forEach(x => {
          categories.push({id: x.id, name: x.name})
        })
        this.setState({categories: categories})
      });
    }
    catch (ex) {
      console.log(ex)
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    let categories = this.state.categories.map(x => (
      <Button raised primary text={x.name} onPress={() => navigate('Quizes', {parentId: x.id})} key={x.id}/>
    ))
    
    return(
      <View>
        {categories}
      </View>
    )
  }
}

export default CategoriesScreen;