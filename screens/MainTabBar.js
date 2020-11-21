import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home/Home';
import MatchesNavigator from './Matches/MatchesNavigator';
import Chat from './Chat/Chat';
import SettingsNavigator from "./Settings/SettingsNavigator";

const Tab = createBottomTabNavigator();

class MainTabBar extends React.Component {
    constructor() {
        super();
    }

    
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Matches" component={MatchesNavigator} />
                <Tab.Screen name="Chat" component={Chat} />
                <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
        )
    }
}

export default MainTabBar