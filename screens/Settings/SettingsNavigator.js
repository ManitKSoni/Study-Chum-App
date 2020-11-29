import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from "./Settings";
import EditProfileScreen from './EditProfileScreen'
import EditProfileMainScreen from './EditProfileMainScreen'
// import EditProfile from "./EditProfile";

import * as Constants from "../../Constants"

const Stack = createStackNavigator();

export default class SettingsNavigator extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Settings" component={Settings} 
                 options={{
                    title:"Settings",
                    headerTitleAlign: "center",
                    headerStyle: {backgroundColor: Constants.secondaryColor},
                    headerTitleStyle: {color:"#FFFFFF", fontFamily:"ProximaNova", 
                    fontSize:Constants.headerFontSize},
                 }}/>
                <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} 
                options= {{
                    title:"Edit Profile",
                    headerTitleAlign: "center",
                    headerStyle: {backgroundColor: Constants.secondaryColor},
                    headerTitleStyle: {color:"#FFFFFF", fontFamily:"ProximaNova", 
                    fontSize:Constants.headerFontSize},
                }} />
                <Stack.Screen name="EditProfileMainScreen" component={EditProfileMainScreen} 
                options= {{
                    title:"Edit Profile",
                    headerTitleAlign: "center",
                    headerStyle: {backgroundColor: Constants.secondaryColor},
                    headerTitleStyle: {color:"#FFFFFF", fontFamily:"ProximaNova", 
                    fontSize:Constants.headerFontSize},
                }} />
            </Stack.Navigator>
        )
    }
}