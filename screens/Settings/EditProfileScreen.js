import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ImageBackground, Image } from 'react-native'

import * as Constants from '../../Constants.js'
import userInstance from '../Singletons/UserSingleton'
import UserProfileAnswerView from '../Authentication/UserProfileAnswerView'

class EditProfileScreen extends React.Component {

    questions = [
        "What's your name?",
        "What's your major?",
        "What year are you graduating?",
        "What is your preferred language?",
        "Tell us a little about yourself!",
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
        }
    }

    constructor() {
        super()
        this.onPressContinue = this.onPressContinue.bind(this)
        

        this.state.userProfile.bio = userInstance._user.bio;
        this.state.userProfile.firstName = userInstance._user.firstName;
        this.state.userProfile.lastName = userInstance._user.lastName;
        this.state.userProfile.major = userInstance._user.major;
        this.state.userProfile.language = userInstance._user.language;
        this.state.userProfile.year = userInstance._user.year;
    }

    componentDidMount() {
        this.setState({index: this.props.route.params.index})
        this.index = this.props.route.params.index
    }


    updateUser = (key, value) => {
        this.state.userProfile[key] = value
        this.setState({ userProfile: this.state.userProfile })
    }

    onPressContinue() {
        // navigate back 
        this.props.navigation.navigate('EditProfileMainScreen', {
            profile: this.state.userProfile
        })
        this.props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });
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