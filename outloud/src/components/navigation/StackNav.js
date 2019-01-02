import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from  'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainScreen from '../MainPage';
import AddScreen from '../AddScreen';
import ModifyItemScreen from '../quiz/ModifyItemScreen'
import DetailScreen from '../DetailScreen';
import CategoriesScreen from '../CategoriesScreen';
import QuizesScreen from '../QuizesScreen';
import Recognizer from '../speech/Recognizer';
import BottomNav from './BottomNav';

const StackNav = createDrawerNavigator({
  Main : {
    screen: MainScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Main',
      headerLeft:
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
          <Icon name='menu' size={30} />
        </TouchableOpacity>
    })
  },
  BottomNav : {
    screen: BottomNav,
    navigationOptions: {
      title: 'BottomNav'
    }
  },
  Categories: {
    screen: CategoriesScreen,
    navigationOptions: {
      title: 'Categories',
    }
  },
  Quizes: {
    screen: QuizesScreen,
    navigationOptions: {
      title: 'Quizes',
    }
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: {
      title: 'Detail',
    }
  },
  Record: {
    screen: Recognizer,
    navigationOptions: {
      title: 'Record',
    }
  },
  Add: {
    screen: AddScreen,
    navigationOptions: {
      title: 'Add'
    }
  },
  ModifyItem: {
    screen: ModifyItemScreen,
    navigationOptions: {
      title: 'ModifyItem'
    }
  }
});

export default StackNav;