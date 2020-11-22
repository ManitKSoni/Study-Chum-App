import 'react-native-gesture-handler';

import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, Image, ImageBackground } from 'react-native'
import * as Constants from '../../Constants.js'
import Firebase from '../../config/Firebase'
const logoHeight = 2480;
const logoWidth = 3508;
const logoRatio = Constants.windowWidth / logoWidth;

class SignUp extends React.Component {

    constructor() {
        super();
        this.onPressSignUp = this.onPressSignUp.bind(this)
    }

    state = {
        email: '',
        password: '',
        passwordConfirm: ''
    }

    /** 
     * Check that the password the user enter matches their confirmation password 
     * Used as a front-end check just to ensure user knows their password
     */
    checkPasswordsMatch() {
        return this.state.password === this.state.passwordConfirm;
    }

    /**
     * Handles errors received from Firebase and alerts the user.
     * https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
     */
    signUpErrorCodes(error) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                alert('That email address is already in use!')
                break;
            case 'auth/invalid-email':
                alert('That email address is invalid!')
                break;
            case 'auth/weak-password':
                alert('Weak password! Please enter at least 6 characters.')
                break;
            case 'auth/operation-not-allowed':
                alert("Operation not allowed. Please contact the developers to enable this option.")
                break;
            default:
                console.error(error)
        }
    }

    /**
     * Handles sign up with some front-end checks before sending it to Firebase
     */
    onPressSignUp() {
        const { email, password, passwordConfirm } = this.state
        if (email === '' || password === '' || passwordConfirm === '') {
            alert("Empty fields! Please enter your information in all the fields.")
        } else if (this.checkPasswordsMatch() === false) {
            alert("Password and Confirmation Password must match!")
        } else {
            Firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    alert("Successful Sign Up!")
                })
                .catch(error => this.signUpErrorCodes(error))
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.prompt}> Register </Text>
                        <TextInput
                            style={styles.inputBox}
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                            placeholder='Email'
                            autoCapitalize='none'
                        />
                        <TextInput
                            style={styles.inputBox}
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                            placeholder='Password'
                            placeholderTextColor={Constants.placeholderTextcolor}
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={styles.inputBox}
                            value={this.state.passwordConfirm}
                            onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
                            placeholder='Confirm Password'
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.buttonLayer}>
                        <ImageBackground style={styles.waves} source={require('../../assets/wave_blue.png')} >
                            <View style = {styles.posFish}>
                                <TouchableOpacity onPress={() => this.onPressSignUp()} >
                                    <Image style={styles.fishButton} source={require('../../assets/fish_button.png')} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>

                </View>
            </TouchableWithoutFeedback>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'flex-start',
        flex: 1,
        backgroundColor: '#fff',
    },
    textContainer: {
        flex: 1,
    },
    prompt: {
        paddingTop: Constants.windowHeight * .15,
        fontSize: 36,
        fontFamily: 'MrsEaves-Bold',
        color: 'black',
        textAlign: 'left',
        letterSpacing: 0,
        alignSelf: 'flex-start',
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
    buttonLayer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    waves: {
        width: Constants.windowWidth,
        height: logoHeight * logoRatio,
        resizeMode: 'contain',
    },
    fishButton: {
        height: Constants.windowHeight * 0.20,
        width: Constants.windowWidth * 0.20,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
    },
    posFish :{
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingRight: 20, 
        paddingBottom: 45,
    },
})

export default SignUp