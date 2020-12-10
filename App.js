import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, View, LogBox, StatusBar} from 'react-native';

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
import SettingsNavigator from "./screens/Settings/SettingsNavigator";
import * as Constants from "./Constants"

let customFonts = {
  'Papyrus': require('./assets/Fonts/PAPYRUS.ttf'),
  'ProximaNova': require('./assets/Fonts/ProximaNova.ttf'),
  'MrsEaves-Bold': require('./assets/Fonts/MrsEaves-Bold.ttf'),
  'Buenard-Bold': require('./assets/Fonts/Buenard-Bold.ttf'),
  'DroidSansMono' : require('./assets/Fonts/DroidSansMono.ttf')
};

/**Create Stack Navigator and provide it the various screens it should know for navigation */
const Stack = createStackNavigator();

export default class App extends React.Component {

  state = {
    fontsLoaded: false,
    imagesLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
 
  async _loadImagesAsync() {
    await Expo.Asset.fromModule(require('./assets/home_selected.png')).downloadAsync();
    await Expo.Asset.fromModule(require('./assets/home_unselected.png')).downloadAsync();
    await Expo.Asset.fromModule(require('./assets/matches_selected.png')).downloadAsync();
    await Expo.Asset.fromModule(require('./assets/matches_unselected.png')).downloadAsync();
    await Expo.Asset.fromModule(require('./assets/chat_selected.png')).downloadAsync();
    await Expo.Asset.fromModule(require('./assets/chat_unselected.png')).downloadAsync();
    await Expo.Asset.fromModule(require('./assets/settings_selected.png')).downloadAsync();
    await Expo.Asset.fromModule(require('./assets/settings_unselected.png')).downloadAsync();
    await Expo.Asset.fromModule(require('./assets/wave.png')).downloadAsync();
    await Expo.Asset.fromModule(require('./assets/fish_button.png')).downloadAsync();
    await Expo.Asset.fromModule(require('./assets/study_chums_logo.png')).downloadAsync();
    await Expo.Asset.fromModule(require('./assets/study_chums_title.png')).downloadAsync();
    await Expo.Asset.fromModule(require('./assets/default_pic.png')).downloadAsync();
    await Expo.Asset.fromModule(require('./assets/default_pic_gray.png')).downloadAsync();
    this.setState({ imagesLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this._loadImagesAsync();
  }

  render() {
    LogBox.ignoreAllLogs(); //IGNORES ALL LOGS
    if (this.state.fontsLoaded && this.state.imagesLoaded) {
      return (
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator initialRouteName="LoginSpinner">
            <Stack.Screen name="LoginSpinner" component={LoginSpinner}
              options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login}
              options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp}
              options={displayOnlyBackArrow} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}
              options={displayOnlyBackArrow} />
            <Stack.Screen name="Home" component={MainTabBar}
              options={{ headerShown: false }} />
            <Stack.Screen name="Spinner" component={Spinner} />
            <Stack.Screen name="CreateUser" component={CreateUserProfile} 
              options={{
                title:"Create Profile",
                headerTitleAlign: "center",
                headerStyle: {backgroundColor: Constants.secondaryColor},
                headerTitleStyle: {color:"#FFFFFF", fontFamily:"ProximaNova", 
                fontSize:Constants.headerFontSize},
              }} 
            />
            <Stack.Screen name="Settings" component={SettingsNavigator}/>
          </Stack.Navigator>
        </NavigationContainer>
      )
    } else {
      return <View></View>;
    }
  }
}

const displayOnlyBackArrow = {
  title: "",
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  }
};

