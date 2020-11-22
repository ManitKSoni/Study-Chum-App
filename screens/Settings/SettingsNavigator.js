import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from "./Settings";
import EditProfile from "./EditProfile";

const Stack = createStackNavigator();

export default class SettingsNavigator extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
            </Stack.Navigator>
        )
    }
}