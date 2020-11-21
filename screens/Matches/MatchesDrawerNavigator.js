import 'react-native-gesture-handler';
import React from 'react'; 
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './MatchesDrawerContent';
import MatchesNavigator from './MatchesNavigator';
import { Icon } from 'react-native-elements';

const Drawer = createDrawerNavigator();

export default class MatchesDrawerNavigator extends React.Component {

    render() {
        return(
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
                <Drawer.Screen name="Matches" component={MatchesNavigator}/>
            </Drawer.Navigator>
        )
    }
}


