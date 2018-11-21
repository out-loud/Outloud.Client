import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
import {api as apiConfig} from '../proxy.json';

let apiUrl;

if (__DEV__) {
  apiUrl = apiConfig.dev + '/healthcheck';
} else {
  apiUrl = apiConfig.prod + '/healthcheck';
}

const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}
function MiniServerDownSign() {
  return (
    <View style={styles.downContainer}>
      <Text style={styles.offlineText}>No connection to the server</Text>
    </View>
  );
}

class OfflineNotice extends PureComponent {
  state = {
    isConnected: true,
    isHealthy: true
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
    try {
      fetch(apiUrl).then(response => this.setState({isHealthy: response.ok}));
    } catch(error) {
      console.log(error);
      this.setState({isHealthy: false})
    }
    
  }

  render() {
    if (!this.state.isConnected)
      return <MiniOfflineSign />;
    else if (!this.state.isHealthy)
      return <MiniServerDownSign/>
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0
  },
  downContainer: {
    backgroundColor: '#cdb62c',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0
  },
  offlineText: { color: '#fff' }
});

export default OfflineNotice;