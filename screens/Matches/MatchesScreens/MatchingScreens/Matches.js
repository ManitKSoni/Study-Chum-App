import React from 'react'

import {Text,View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'

class Matches extends React.Component{

    constructor() {
        super();
    }

    /*
    * TODO: 
    * 
    * Update course docs when user edits profile(like language, bio, etc)
    * When editing pref profile, get info and send to SavedData (change the flow of data) LOW PRIO 
    * When deleting from ShowMatches on current matches, still shows current matches
    */

    render() {

       return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                 <View style={styles.container}>
                      <Text> Use Top Left Button to Add Class to Find Matches For</Text>
                      <Text> On a Class Swipe Left to Right to Delete Selected Class </Text>
                 </View>
          </TouchableWithoutFeedback>
       )
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'left'
    },
    buttonLogin: {
        marginTop: 5,
        marginBottom: 5,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 150,
        textAlign: 'center',
        fontSize: 15
    },
    textSignUp: {
        padding: 10,
        color: '#007AFF',
        fontSize: 15
    },
    textForgotPassword: {
        padding: 10,
        color: '#FFA000',
        fontSize: 15
    }
})
export default Matches