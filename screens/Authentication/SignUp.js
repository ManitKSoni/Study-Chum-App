import 'react-native-gesture-handler';

import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'

import Firebase from '../../config/Firebase'

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
                .then(() => alert("Successful Sign Up!"))
                .catch(error => this.signUpErrorCodes(error))
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
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
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.passwordConfirm}
                        onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
                        placeholder='Confirm Password'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.buttonSignUp} onPress={this.onPressSignUp}>
                        <Text>Sign Up</Text>
                    </TouchableOpacity>
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
        justifyContent: 'center'
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
    buttonSignUp: {
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
    },
})

export default SignUp