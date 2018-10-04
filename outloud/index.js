import { AppRegistry, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import {name as appName} from './app.json';

import SideMenu from './src/components/navigation/SideMenuComponent'
import stackNav from './src/components/navigation/StackNav';
import { Sentry } from 'react-native-sentry';
import {sentry as sentryConfig} from './src/configuration.json';

if (!__DEV__) {
  Sentry.config(sentryConfig.dsn).install();
}

const drawernav = DrawerNavigator({
  Item1: {
    screen: stackNav,
  }
}, {
  contentComponent: SideMenu,
  drawerWidth: Dimensions.get('window').width - 120
});

AppRegistry.registerComponent(appName, () => drawernav);