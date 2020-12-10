import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ImageBackground, Image } from 'react-native'

import * as Constants from '../../Constants.js'
import UserProfileAnswerView from '../Authentication/UserProfileAnswerView'

class EditProfileScreen extends React.Component {

    questions = [
        "What's your name?",
        "What's your major?",
        "What year are you graduating?",
        "What is your preferred language?",
        "Tell us a little about yourself!",
    ]

    alerts = [
        "Please enter your full name!",
        "Please select a major from the list!",
        "Please select a graduating year!",
        "Please select a language from the list!",
        "Please enter a bio!"
    ]

    state = {
        index: 0,
        userProfile: {
            firstName: '',
            lastName: '',
            major: '',
            year: '',
            language: '',
            bio: '',
            courses: []
        }
    }

    constructor() {
        super()
        this.onPressContinue = this.onPressContinue.bind(this)
    }

    componentDidMount() {
        const userProfile = this.props.route.params.userProfile
        this.setState({
            index: this.props.route.params.index, 
            userProfile: {
                firstName: userProfile.firstName,
                lastName: userProfile.lastName,
                major: userProfile.major,
                year: userProfile.year,
                language: userProfile.language,
                bio: userProfile.bio,
                courses: userProfile.courses
            }
        })
    }

    updateUser = (key, value) => {
        this.state.userProfile[key] = value
        this.setState({ userProfile: this.state.userProfile })

    }

    onPressContinue() {
        switch (this.state.index) {
            case 0:
                if (this.state.userProfile.firstName === '' || this.state.userProfile.lastName === '' ) {
                    alert(this.alerts[0])
                    return
                } 
                break;
            case 1:
                if (this.state.userProfile.major === '') {
                    alert(this.alerts[1])
                    return
                } 
                break;
            case 2:
                if (this.state.userProfile.year === '') {
                    alert(this.alerts[2])
                    return
                } 
                break;
            case 3:
                if (this.state.userProfile.language === '') {
                    alert(this.alerts[3])
                    return
                } 
                break;
            case 4:
                if (this.state.userProfile.bio === '') {
                    alert(this.alerts[4])
                    return
                } 
                break;
            default: 
                return
            }
            this.props.navigation.navigate('EditProfileMainScreen', {
                profile: this.state.userProfile
            })
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.question}>{this.questions[this.state.index]}</Text>
                        <UserProfileAnswerView style={{ zIndex: 9999 }} index={this.state.index} profile={this.state.userProfile} update={this.updateUser} />
                    </View>
                    <ImageBackground style={styles.waves} source={require('../../assets/wave.png')} >
                        <View style={styles.posFish}>
                            <TouchableOpacity onPress={() => this.onPressContinue()} >
                                <Image style={styles.fishButton} source={require('../../assets/fish_button.png')} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        minHeight: Math.round(Constants.windowHeight)
    },
    question: {
        paddingTop: Constants.windowHeight * .15,
        fontSize: 36,
        fontFamily: 'Buenard-Bold',
        lineHeight: 40,
        color: 'black',
        textAlign: 'left',
        letterSpacing: 0,
        alignSelf: 'flex-start',
        paddingBottom: Constants.windowHeight * .02,
        padding: Constants.windowWidth * .1,
    },
    waves: {
        width: Constants.windowWidth,
        height: Constants.waveHeight * Constants.waveWidthRatio,
    },
    fishButton: {
        height: Constants.windowHeight * 0.20,
        width: Constants.windowWidth * 0.20,
        resizeMode: 'contain',
    },
    posFish: {
        flex: 1,
        alignSelf: 'flex-end',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingRight: Constants.waveWidth * 0.01,
        paddingBottom: Constants.waveHeight * Constants.waveWidthRatio * 0.4,
    },

})

export default EditProfileScreen