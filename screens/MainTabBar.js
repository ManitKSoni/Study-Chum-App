import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home/Home';
import MatchesNavigator from './Matches/MatchesNavigator';
import ChatNavigator from './Chat/ChatNavigator';
import SettingsNavigator from './Settings/SettingsNavigator'
import MatchesDrawerNavigator from './Matches/MatchesDrawerNavigator'

const Tab = createBottomTabNavigator();

class MainTabBar extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Matches" component={MatchesDrawerNavigator} />
                <Tab.Screen name="Chat" component={ChatNavigator} />
                <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
        )
    }
}

export default MainTabBar
