import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import SignupLoginScreen from './screens/SignupLoginScreen';
import {AppTabNavigator} from './components/AppTabNavigator';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

const Navigator = createSwitchNavigator({
  LoginScreen: {screen: SignupLoginScreen},
  TabNavigator: {screen: AppTabNavigator}
})

const AppContainer = createAppContainer(Navigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
