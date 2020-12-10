import React from 'react'
import {Image, StyleSheet} from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home/Home';
import ChatNavigator from './Chat/Controller/ChatNavigator';
import SettingsNavigator from './Settings/SettingsNavigator'
import MatchesDrawerNavigator from './Matches/Navigators/MatchesDrawerNavigator'


const Tab = createBottomTabNavigator();

class MainTabBar extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Tab.Navigator screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    switch(route.name) {
                        case 'Home':
                            if (focused) {
                                return <Image style={styles.icon} source={require('../assets/home_selected.png')} />
                            } else {
                                return <Image style={styles.icon} source={require('../assets/home_unselected.png')} />
                            }
                        case 'Matches':
                            if (focused) {
                                return <Image style={styles.icon} source={require('../assets/matches_selected.png')} />
                            } else {
                                return <Image style={styles.icon} source={require('../assets/matches_unselected.png')} />
                            }
                        case 'Chat':
                            if (focused) {
                                return <Image style={styles.icon} source={require('../assets/chat_selected.png')} />
                            } else {
                                return <Image style={styles.icon} source={require('../assets/chat_unselected.png')} />
                            }
                        case 'Settings':
                            if (focused) {
                                return <Image style={styles.icon} source={require('../assets/settings_selected.png')} />
                            } else {
                                return <Image style={styles.icon} source={require('../assets/settings_unselected.png')} />
                            }
                    }
                },
            })} 
            tabBarOptions={{
                showLabel: false,
            }}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Matches" component={MatchesDrawerNavigator} />
                <Tab.Screen name="Chat" component={ChatNavigator} />
                <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        resizeMode: 'contain',
        width: 35,
        height: 35,
        overflow: 'hidden',
        justifyContent: 'space-around',
    },
})

export default MainTabBar
