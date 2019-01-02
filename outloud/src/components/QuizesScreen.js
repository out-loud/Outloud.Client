import React, {Component} from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-material-ui';
import {api as apiConfig} from '../proxy.json';

class QuizesScreen extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
      quizes: [],
      parentId: props.navigation.state.params.parentId
    }
  }

  getUrl = (endpoint) => {
    if (__DEV__)
      return `${apiConfig.dev}/${endpoint}`
    else
      return `${apiConfig.prod}/${endpoint}`
  }

  componentDidMount() {
    apiUrl = this.getUrl(`quizes/${this.state.parentId}`)
    try {
      fetch(apiUrl)
      .then(response => response.json())
      .then(responseJson => {
        let quizes = []
        console.log(apiUrl)
        responseJson.forEach(x => {
          quizes.push({id: x.id, name: x.name})
        })
        this.setState({quizes: quizes})
      });
    }
    catch (ex) {
      console.log(ex)
    }
  }

  render() {
    console.log(this.state.quizes)
    const {navigate} = this.props.navigation;
    let quizes = this.state.quizes.map(x => (
      <Button raised primary text={x.name} onPress={() => navigate('Record', {parentId: x.id})} key={x.id}/>
    ))
    console.log(this.state.categories)
    return(
      <View>
        {quizes}
      </View>
    )
  }
}

export default QuizesScreen;