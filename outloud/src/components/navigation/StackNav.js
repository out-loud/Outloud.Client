import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StackNavigator} from  'react-navigation';
import Icon from "react-native-vector-icons/MaterialIcons";
import MainScreenComponent from "../MainPageComponent";
import DetailScreenComponent from "../DetailScreenComponent";

const StackNav = StackNavigator({
  Main : {
    screen: MainScreenComponent,
    navigationOptions: ({navigation}) => ({
      title: "Main",
      headerLeft:(<TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                    <Icon name="menu" size={30} />
                  </TouchableOpacity>
      )
    })
  },
  Detail: {
    screen: DetailScreenComponent,
    navigationOptions: {
      title: "Detail",
    }
  }
});

export default StackNav;