import 'react-native-gesture-handler';

import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Matches from "./MatchesScreens/MatchingScreens/Matches"; 
import Courses from "./MatchesScreens/CreationScreens/Courses"
import Availibility from './MatchesScreens/CreationScreens/Availibility';
import Blank from "./MatchesScreens/Blank";
import Quiet from "./MatchesScreens/CreationScreens/Quiet";
import ShowMatches from "./MatchesScreens/MatchingScreens/ShowMatches";
import Remote from "./MatchesScreens/CreationScreens/Remote";
import UserProfile from "./MatchesScreens/MatchingScreens/UserProfile"
import {Icon} from 'react-native-elements';
import EditPreferences from './MatchesScreens/EditingScreens/EditPreferences';
import EditAvailability from './MatchesScreens/EditingScreens/EditAvailability';
import EditQuiet from "./MatchesScreens/EditingScreens/EditQuiet"
import EditRemote from "./MatchesScreens/EditingScreens/EditRemote"


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
              title: "Matches",
              headerLeft: () => (
                <Icon name="menu" size ={30} containerStyle={{paddingLeft:5}} color="#FFFFFF"
                backgroundColor="#009387" onPress={() => this.props.navigation.openDrawer()}/>
              ),
              headerRight: () => (
                <Icon name="edit" size={30} type="material" containerStyle={{paddingRight:5}} 
                  color="#FFFFFF" onPress={() => this.props.navigation.navigate("EditPreferences")}/>
              )
            }}/>

          <Stack.Screen name="Remote" component={Remote}
           options = {{
            headerShown:null, 
            }}/>  
            
            <Stack.Screen name="Blank" component={Blank} options={{headerShown:null}}/> 

            <Stack.Screen name="UserProfile" component={UserProfile} options={{headerLeft:null}}/>

            <Stack.Screen name="EditPreferences" component={EditPreferences} 
              options={{
                headerLeft:null,
                headerStyle: {backgroundColor: "#8075FF"},
                headerTitleStyle: {color:"#FFFFFF"},
                title: "Edit Preferences",
                }}
            />

            <Stack.Screen name="EditAvailability" component={EditAvailability} options={{headerShown:null}}/>

            <Stack.Screen name="EditQuiet" component={EditQuiet} options={{headerShown:null}}/>

            <Stack.Screen name="EditRemote" component={EditRemote} options={{headerShown:null}}/>

        </Stack.Navigator>
    )
  }
}

