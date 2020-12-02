import 'react-native-gesture-handler';

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Chat from './Chat';
import Channel from './Channel';
import UserProfile from './UserProfile';
import * as Constants from '../../Constants.js';
import {Icon} from 'react-native-elements';

const Stack = createStackNavigator();

export default class ChatNavigator extends React.Component {

    constructor(props){
        super(props)
        this.onPressGoToChat = this.onPressGoToChat.bind(this);
    }

    onPressGoToChat(){
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Chat' }],
        });
    }

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
                <Stack.Screen name="Channel" component={Channel} options={{
                    headerLeft: () => (
                        <Icon name="chevron-left" type="octicon" size={40} containerStyle={{paddingLeft:Constants.windowWidth*.025}}
                        color="#FFFFFF" onPress={this.onPressGoToChat}/>
                    ),
                    title:"",
                    headerTitleAlign: "center",
                    headerStyle: {backgroundColor: Constants.secondaryColor},
                    headerTitleStyle: {color:"#FFFFFF", fontFamily:"ProximaNova", 
                    fontSize:Constants.headerFontSize},
                 }}/>
                <Stack.Screen name="UserProfile" component={UserProfile} />
            </Stack.Navigator>
        )
    }
}

