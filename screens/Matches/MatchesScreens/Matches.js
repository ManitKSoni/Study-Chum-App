import React from 'react'

import {Text,View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'

class Matches extends React.Component{

    constructor() {
        super();
    }

    /*
    * TODO: 
    * 
    * Render Matches on Matches screen,not ShowMatches
    * Delete button
    * Search Function or try catch maybe????
    * Update course docs when user edits profile(like language, bio, etc)
    * WHEN ADDING NON-EXISTING CLASSES, THOSE CLASSES ARE STILL ADDED TO COURSES, a fix is to only have presets. 
    */

    render() {

       return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                 <View style={styles.container}>
                      <Text> Slide to Right To See Class Matches</Text>
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