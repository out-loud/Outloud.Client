import { AppRegistry, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import {name as appName} from './app.json';

import SideMenu from './src/components/navigation/SideMenuComponent'
import stackNav from './src/components/navigation/StackNav';

const drawernav = DrawerNavigator({
  Item1: {
      screen: stackNav,
    }
  }, {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,  
});

AppRegistry.registerComponent(appName, () => drawernav);