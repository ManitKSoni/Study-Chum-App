import 'react-native-gesture-handler';

import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, Image, ImageBackground } from 'react-native'
import Firebase from '../../config/Firebase'

import * as Constants from '../../Constants.js'

class ForgotPassword extends React.Component {

    constructor() {
        super();
        this.onPressForgotPassword = this.onPressForgotPassword.bind(this)
    }

    state = {
        email: '',
    }

    /**
     * Handles errors received from Firebase and alerts the user.
     * Note: There are more error codes for platform specific cases which I did not add.
     * https://firebase.google.com/docs/reference/js/firebase.auth.Auth#sendpasswordresetemail
     */
    forgotPasswordErrorCodes(error) {
        switch (error.code) {
            case 'auth/invalid-email':
                alert('That email address is invalid!')
                break;
            case 'auth/user-not-found':
                alert('The user was not found!')
                break;
            default:
                console.error(error)
        }
    }

    onPressForgotPassword() {
        // Check input for good value
        const { email } = this.state
        if (email === '') {
            alert("Empty field! Please enter an email.")
        } else {
            try {
                Firebase.auth()
                    .sendPasswordResetEmail(email)
                    .then(() => alert("Password reset link successfully sent!"))
                    .catch(error => this.forgotPasswordErrorCodes(error))
            } catch (error) {
                console.error(error);
            }
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.prompt}> Enter your email </Text>
                        <TextInput
                            style={styles.inputBox}
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                            placeholder='Email'
                            autoCapitalize='none'
                        />
                    </View>
                    <ImageBackground style={styles.waves} source={require('../../assets/wave.png')} >
                        <View style={styles.posFish}>
                            <TouchableOpacity onPress={() => this.onPressForgotPassword()} >
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
    prompt: {
        paddingTop: Constants.windowHeight * .15,
        fontSize: 36,
        fontFamily: 'Buenard-Bold',
        color: 'black',
        textAlign: 'left',
        paddingLeft: Constants.windowWidth * .045,
        paddingBottom: Constants.windowHeight * .02,
    },
    inputBox: {
        width: '85%',
        margin: 16,
        fontFamily: 'ProximaNova',
        alignSelf: 'center',
        fontSize: 24,
        borderColor: Constants.boxGrey,
        borderBottomWidth: .5,
        textAlign: 'left'
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
        paddingRight: Constants.waveWidth*0.01,
        paddingBottom: Constants.waveHeight * Constants.waveWidthRatio * 0.3,
    },
})

export default ForgotPassword