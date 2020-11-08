import React from 'react'
import { View, Button } from 'react-native'

import Firebase from '../../config/Firebase'

class Settings extends React.Component{
    
    constructor() {
        super();
        this.onPressLogOut= this.onPressLogOut.bind(this)
    }

    /** Handle logging out and reset stack */
    onPressLogOut() {
        try {
            Firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View>
                <Button
                    title="Log out"
                    onPress={this.onPressLogOut} 
                />
            </View>
        )
    }
}

export default Settings