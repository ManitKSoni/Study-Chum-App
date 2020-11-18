import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home/Home';
import MatchesNavigator from './Matches/MatchesNavigator';
import ChatNavigator from './Chat/ChatNavigator';
import Settings from './Settings/Settings'

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
                <Tab.Screen name="Chat" component={ChatNavigator} />
                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
        )
    }
}

export default MainTabBar