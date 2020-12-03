import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from "./Settings";
import EditProfileScreen from './EditProfileScreen'
import EditProfileMainScreen from './EditProfileMainScreen'
// import EditProfile from "./EditProfile";
import { Icon } from 'react-native-elements';
import * as Constants from "../../Constants"

const Stack = createStackNavigator();

export default class SettingsNavigator extends React.Component {
    constructor(props){
        super(props)
        this.onPressGoToSettings= this.onPressGoToSettings.bind(this);
        this.onPressGoToEditProfileMain= this.onPressGoToEditProfileMain.bind(this);
    }
    onPressGoToSettings() {
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Settings' }],
        })
        this.props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: true
        });
    }
    onPressGoToEditProfileMain() {
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'EditProfileMainScreen' }],
        })
        this.props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: true
        });
    }

    render() {
        return (
            <Stack.Navigator initialRouteName="Settings">
                <Stack.Screen name="Settings" component={Settings}
                    options={{
                        title: "Settings",
                        headerTitleAlign: "center",
                        headerStyle: { backgroundColor: Constants.secondaryColor },
                        headerTitleStyle: {
                            color: "#FFFFFF", fontFamily: "ProximaNova",
                            fontSize: Constants.headerFontSize
                        },
                    }} />
                <Stack.Screen name="EditProfileScreen" component={EditProfileScreen}
                    options={{
                        headerLeft: () => (
                            <Icon name="chevron-left" type="octicon" size={40} containerStyle={{ paddingLeft: Constants.windowWidth * .025 }}
                                color="#FFFFFF" onPress={this.onPressGoToEditProfileMain} />
                        ),
                        title: "Edit Profile",
                        headerTitleAlign: "center",
                        headerStyle: { backgroundColor: Constants.secondaryColor },
                        headerTitleStyle: {
                            color: "#FFFFFF", fontFamily: "ProximaNova",
                            fontSize: Constants.headerFontSize
                        },
                    }} />
                <Stack.Screen name="EditProfileMainScreen" component={EditProfileMainScreen}
                    options={{
                        headerLeft: () => (
                            <Icon name="chevron-left" type="octicon" size={40} containerStyle={{ paddingLeft: Constants.windowWidth * .025 }}
                                color="#FFFFFF" onPress={this.onPressGoToSettings} />
                        ),
                        title: "Edit Profile",
                        headerTitleAlign: "center",
                        headerStyle: { backgroundColor: Constants.secondaryColor },
                        headerTitleStyle: {
                            color: "#FFFFFF", fontFamily: "ProximaNova",
                            fontSize: Constants.headerFontSize
                        },
                    }} />
            </Stack.Navigator>
        )
    }
}