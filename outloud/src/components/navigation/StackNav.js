import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StackNavigator} from  'react-navigation';
import Icon from "react-native-vector-icons/MaterialIcons";
import MainScreen from "../MainPage";
import DetailScreen from "../DetailScreen";

const StackNav = StackNavigator({
  Main : {
    screen: MainScreen,
    navigationOptions: ({navigation}) => ({
      title: "Main",
      headerLeft:(<TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                    <Icon name="menu" size={30} />
                  </TouchableOpacity>
      )
    })
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: {
      title: "Detail",
    }
  }
});

export default StackNav;