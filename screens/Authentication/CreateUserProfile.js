import 'react-native-gesture-handler';

import React from 'react'

import { View, TextInput, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Button, Image } from 'react-native'
import { HeaderBackButton } from '@react-navigation/stack';



import Firebase from '../../config/Firebase'
import userInstance from '../Singletons/UserSingleton'

class UserProfileAnswerView extends React.Component {

    constructor() {
        super()
    }

    correctView() {
        switch(this.props.index) {
            case 0: 
                return (
                    <View style={styles.answer}>
                        <TextInput
                            style={styles.inputBox}
                            value={this.props.profile.firstName}
                            onChangeText={firstName => this.props.update('firstName', firstName)}
                            placeholder='First Name'
                        />
                        <TextInput
                            style={styles.inputBox}
                            value={this.props.profile.lastName}
                            onChangeText={lastName => this.props.update( 'lastName', lastName )}
                            placeholder='Last Name'
                        />
                    </View>
                )
            case 1: 
                // TODO: Make this a dropdown 
                return (
                    <View style={styles.answer}>
                        <TextInput
                            style={styles.inputBox}
                            value={this.props.profile.major}
                            onChangeText={major => this.props.update( 'major', major )}
                            placeholder='Major'
                        />
                    </View>
                )
            case 2: 
                return (
                    <View style={styles.answer}>
                        <TextInput
                            style={styles.inputBox}
                            value={this.props.profile.year}
                            onChangeText={year => this.props.update('year', year )}
                            placeholder='Year'
                        />
                    </View>
                )
            case 3: 
                return (
                    <View style={styles.answer}>
                        <TextInput
                            style={styles.inputBox}
                            value={this.props.profile.language}
                            onChangeText={language => this.props.update( 'language', language )}
                            placeholder='Language'
                        />
                    </View>
                )
            case 4: 
                return (
                    <View style={styles.answer}>
                        <TextInput
                            style={styles.inputBox}
                            value={this.props.profile.bio}
                            onChangeText={bio => this.props.update( 'bio', bio )}
                            placeholder='Bio'
                        />
                    </View>
                )
            default: 
                return (
                    <View></View>
                )
        }
    }
    render() {
        return (
            <View>
                {this.correctView()}
            </View>
        )
    }
}
class CreateUserProfile extends React.Component {
    
    state = {
        index: 0,
        userProfile: {
            firstName: '',
            lastName: '',
            major: '', 
            year: '',
            language: '',
            bio: ''
        }
    }

    updateUser = (key, value) => {
        this.state.userProfile[key] = value
        this.setState({ userProfile: this.state.userProfile })
    }

    questions = (index) => {
        switch(index) {
            case 0: 
                return "What's your name?"
            case 1:
                return `Hi ${this.state.userProfile.firstName}! What's your major?`
            case 2:
                return  `Oh, ${this.state.userProfile.major}! Very cool! What year are you graduating?`
            case 3: 
                return `What is your preferred language?`
            case 4: 
                return `Tell us a little about yourself!`
            default:
                return ""
        }
    }

    constructor() {
        super()
        this.onPressContinue = this.onPressContinue.bind(this)
    }


    onPressContinue() {
        console.log("pew")
        if (this.state.index < 4) {
            this.setState({index: this.state.index + 1})
        } else {
            userInstance.createUser(this.state.userProfile, () => {
                this.props.navigation.reset({
                    index: 0, 
                    routes: [{ name: 'Home'}]
                });
            });
        }
    }

    // TODO: UI and add more fields
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Text style={styles.question}>{this.questions(this.state.index)}</Text>
                    <UserProfileAnswerView index={this.state.index} profile={this.state.userProfile} update={this.updateUser}/> 
                    <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 0}}>
                        <Image style={{ width: '100%', position: 'absolute', height: 150, zIndex: 0}} source={require('../../assets/wave_smol.png')} />  
                        <TouchableOpacity onPress={() => this.onPressContinue()} >                 
                            <Image style={{width: 80, height: 80, right: -300, bottom: 10}} source={require('../../assets/light_purple_arrow_gill_eye.png')} />  
                        </TouchableOpacity>
                    </View>  
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },

    inputBox: {
        width: '100%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'left'
    },

    question: {
        fontSize: 20,
        padding: 20, 
    },

    answer: {
        backgroundColor: '#fff',
        width: '100%',
        padding:  15
    },

    button: {
        marginTop: 5,
        marginBottom: 5,
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 150,
        textAlign: 'center',
        fontSize: 15
    }

})

export default CreateUserProfile