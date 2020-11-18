import 'react-native-gesture-handler';

import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Matches from "./MatchesScreens/Matches"; 
import Courses from "./MatchesScreens/Courses"
import Availibility from './MatchesScreens/Availibility';
import Language from "./MatchesScreens/Language";
import Timezone from "./MatchesScreens/Timezone";
import Quiet from "./MatchesScreens/Quiet";
import TimeOfDay from "./MatchesScreens/TimeOfDay";
import ShowMatches from "./ShowMatches";


/**Create Stack Navigator and provide it the various screens it should know for navigation */
const Stack = createStackNavigator();

export default class MatchesNavigator extends React.Component {
  render() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Matches" component={Matches}/>
          <Stack.Screen name="Courses" component={Courses} 
            options={{headerLeft:null}} />
          <Stack.Screen name="Availibility" component={Availibility}/>
          <Stack.Screen name="Timezone" component={Timezone}/>
          <Stack.Screen name="Language" component={Language}/>
          <Stack.Screen name="Quiet" component={Quiet}/>
          <Stack.Screen name="TimeOfDay" component={TimeOfDay}/>
          <Stack.Screen name="ShowMatches" component={ShowMatches}/>
        </Stack.Navigator>
    )
  }
}

