import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from  'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainScreen from '../MainPage';
import AddScreen from '../AddScreen';
import ModifyItemScreen from '../quiz/ModifyItemScreen'
import DetailScreen from '../DetailScreen';
import RecordScreen from '../RecordScreen';

const StackNav = createDrawerNavigator({
  Main : {
    screen: MainScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Main',
      headerLeft:(<TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                    <Icon name='menu' size={30} />
                  </TouchableOpacity>
      )
    })
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: {
      title: 'Detail',
    }
  },
  Record: {
    screen: RecordScreen,
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