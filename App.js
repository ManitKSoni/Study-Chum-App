import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginSpinner from './screens/Loading/LoginSpinner';
import Login from './screens/Authentication/Login';
import SignUp from './screens/Authentication/SignUp';
import ForgotPassword from './screens/Authentication/ForgotPassword';
import MainTabBar from './screens/MainTabBar';
import Spinner from './screens/Reusable/Spinner';
import CreateUserProfile from './screens/Authentication/CreateUserProfile'
import Profile from './screens/Settings/Profile'


/**Create Stack Navigator and provide it the various screens it should know for navigation */
const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginSpinner">
          <Stack.Screen name="LoginSpinner" component={LoginSpinner} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Home" component={MainTabBar} />
          <Stack.Screen name="Spinner" component={Spinner} />
          <Stack.Screen name="CreateUser" component={CreateUserProfile} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

/** Place holder style sheets **/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

