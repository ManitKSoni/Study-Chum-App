import 'react-native-gesture-handler';

import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Matches from "./MatchesScreens/Matches"; 
import Courses from "./MatchesScreens/Courses"
import Availibility from './MatchesScreens/Availibility';
import Blank from "./MatchesScreens/Blank";
import Quiet from "./MatchesScreens/Quiet";
import ShowMatches from "./MatchesScreens/ShowMatches";
import Remote from "./MatchesScreens/Remote";
import UserProfile from "./MatchesScreens/UserProfile"
import {Icon} from 'react-native-elements';


/**Create Stack Navigator and provide it the various screens it should know for navigation */
const Stack = createStackNavigator();

export default class MatchesNavigator extends React.Component {

  render() {
    return (
        <Stack.Navigator>

          <Stack.Screen name="Matches" component={Matches} 
            options = {{
              title: "Matches",
              headerStyle: {backgroundColor: "#8075FF"},
              headerTitleStyle: {color:"#FFFFFF", fontFamily:"ProximaNova"},
              headerLeft: () => (
                <Icon name="menu" size={30} containerStyle={{paddingLeft:5}} color="#FFFFFF"
                backgroundColor="#009387" onPress={()=> this.props.navigation.openDrawer()}/>
              )
            }}
          />

          <Stack.Screen name="Courses" component={Courses} 
            options = {{
              headerShown:null, 
            }} 
          />

          <Stack.Screen name="Availibility" component={Availibility}
            options = {{
              headerShown:null, 
          }}
          />

          <Stack.Screen name="Quiet" component={Quiet}
            options = {{
              headerShown: false
            }}
          />

          <Stack.Screen name="ShowMatches" component={ShowMatches}
             options = {{
              gestureEnabled: false,
              headerStyle: {backgroundColor: "#8075FF"},
              headerTitleStyle: {color:"#FFFFFF"},
              title: "ShowMatches",
              headerLeft: () => (
                <Icon name="menu" size ={30} containerStyle={{paddingLeft:5}} color="#FFFFFF"
                backgroundColor="#009387" onPress={() => this.props.navigation.openDrawer()}/>
              )
            }}/>

          <Stack.Screen name="Remote" component={Remote}
           options = {{
            headerShown:null, 
            }}/>  
            
            <Stack.Screen name="Blank" component={Blank} options={{headerShown:null}}/> 

            <Stack.Screen name="UserProfile" component={UserProfile} options={{headerLeft:null}}/>

        </Stack.Navigator>
    )
  }
}

