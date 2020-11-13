import React from 'react'

import { View, Text } from 'react-native'

import {TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'
import PreferenceProfiles from "../PreferenceProfiles"

class Courses extends React.Component {

    state = {
        courseName: ""
    }

    onPressGoToAvailability = () => {
        PreferenceProfiles.addCourse(this.state.courseName); 
        this.props.navigation.navigate("Availibility");
    }

    onPressGoToMatches = () => {
        this.props.navigation.navigate("Matches");
    }
    

    render() {
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
            <TextInput
                        style={styles.inputBox}
                        value={this.state.courseName}
                        onChangeText={courseName => this.setState({ courseName })}
                        placeholder='Course Name'
            />
            <Button title="Submit" onPress={this.onPressGoToAvailability}/>
            <Button title="Cancel" onPress={this.onPressGoToMatches}/>
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

export default Courses; 