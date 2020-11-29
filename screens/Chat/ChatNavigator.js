import 'react-native-gesture-handler';

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Chat from './Chat';
import Channel from './Channel';
import UserProfile from './UserProfile';
import * as Constants from '../../Constants.js';


const Stack = createStackNavigator();

export default class ChatNavigator extends React.Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="Chat">
                <Stack.Screen name="Chat" component={Chat} 
                 options={{
                    title:"Chat",
                    headerTitleAlign: "center",
                    headerStyle: {backgroundColor: Constants.secondaryColor},
                    headerTitleStyle: {color:"#FFFFFF", fontFamily:"ProximaNova", 
                    fontSize:Constants.headerFontSize},
                 }}/>
                <Stack.Screen name="Channel" component={Channel} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
            </Stack.Navigator>
        )
    }
}

