import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Font from 'expo-font';


import LoginSpinner from './screens/Loading/LoginSpinner';
import Login from './screens/Authentication/Login';
import SignUp from './screens/Authentication/SignUp';
import ForgotPassword from './screens/Authentication/ForgotPassword';
import MainTabBar from './screens/MainTabBar';
import Spinner from './screens/Reusable/Spinner';
import CreateUserProfile from './screens/Authentication/CreateUserProfile'
import Settings from "./screens/Settings/SettingsNavigator";

let customFonts = {
  'Papyrus': require('./assets/Fonts/PAPYRUS.ttf'),
};

/**Create Stack Navigator and provide it the various screens it should know for navigation */
const Stack = createStackNavigator();

export default class App extends React.Component {

  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (this.state.fontsLoaded) {

      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginSpinner">
            <Stack.Screen name="LoginSpinner" component={LoginSpinner}
                options={{headerShown:false}} />
            <Stack.Screen name="Login" component={Login}
                options={{headerShown:false}}/>
            <Stack.Screen name="SignUp" component={SignUp}
                options={{title:""}} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Home" component={MainTabBar}
               options={{headerShown:false}} />
            <Stack.Screen name="Spinner" component={Spinner} />
            <Stack.Screen name="CreateUser" component={CreateUserProfile} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    } else {
      return <View></View>;
    }
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
