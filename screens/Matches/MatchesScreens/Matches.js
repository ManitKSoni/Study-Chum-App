import React from 'react'

import { View, Text } from 'react-native'
import Firebase from '../../../config/Firebase'
import instance from '../../Singletons/UserSingleton'

import {TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'
import PreferenceProfiles from "../PreferenceProfiles"; 

class Matches extends React.Component{

   /* state = {
        courseName: "", 
        availability: {
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false
        },
        language: "",
        timezone: "",
        quiet: false,
        timeOfDay: ""
    }*

    addPreferenceProfile = () => {
        PreferenceProfiles.addPreferenceProfile( this.state.courseName,
            this.state.availability, this.state.language, this.state.timezone,
            this.state.quiet, this.state.timeOfDay);
    }

    deletePreferenceProfile = () => {
        PreferenceProfiles.deletePreferenceProfile("CHIN 198. Directed Group Study in Chinese Studies");
    }*/

    constructor() {
        super();
        this.onPressGoToCourses = this.onPressGoToCourses.bind(this);
    }
    
    onPressGoToCourses() {
        this.props.navigation.navigate("Courses");
    }
    
    render() {
       /* return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.courseName}
                        onChangeText={courseName => this.setState({ courseName })}
                        placeholder='Course Name'
                    />
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.language}
                        onChangeText={language => this.setState({ language })}
                        placeholder='Language'
                    />
                     <TextInput
                        style={styles.inputBox}
                        value={this.state.timezone}
                        onChangeText={timezone => this.setState({ timezone })}
                        placeholder='Timezone'
                    />
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.timeOfDay}
                        onChangeText={timeOfDay => this.setState({ timeOfDay })}
                        placeholder='Time Of Day Free'
                    />
                    <Button title="Submit" onPress={this.addPreferenceProfile}/>
                    <Button title="delete test" onPress={this.deletePreferenceProfile}/>
                    
                </View>
            </TouchableWithoutFeedback>
        )*/

        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
               <Button title="Add class" onPress={this.onPressGoToCourses}/>
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