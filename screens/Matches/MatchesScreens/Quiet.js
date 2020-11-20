import React from 'react'

import { View, Text, TouchableOpacityBase } from 'react-native'

import {Switch, StyleSheet, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'

import PreferenceProfiles from "../PreferenceProfiles";
import MatchingAlgorithm from "../MatchingAlgorithm"

class Quiet extends React.Component {

    state = {
        quiet: false 
    }

    onPressGoToMatches = () => {
        this.props.navigation.navigate("Matches");
    }


    generateMatches = () => {
        PreferenceProfiles.addQuiet(this.state.quiet);
        PreferenceProfiles.addAndShow(this.props);
    }

    //Add preference profile and then do matches

    render() {
     
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
            <Text> Quiet? </Text>
                <Switch 
                 trackColor={{ false: "#FF0000", true: "00FF00" }}
                 ios_backgroundColor="#3e3e3e"
                 onValueChange={(quiet) => this.setState({quiet})}
                 value={this.state.quiet}
                />  
                <Button title="Cancel" onPress={this.onPressGoToMatches}/>
                <Button title="Find Chums!" onPress={this.generateMatches}/>
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

export default Quiet; 