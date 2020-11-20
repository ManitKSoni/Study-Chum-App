import 'react-native-gesture-handler';

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Chat from './Chat';
import Channel from './Channel';

const Stack = createStackNavigator();

export default class ChatNavigator extends React.Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="Chat">
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="Channel" component={Channel} />
            </Stack.Navigator>
        )
    }
}

