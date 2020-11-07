import 'react-native-gesture-handler';

import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'

import Firebase from '../../config/Firebase'

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
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder='Enter your email'
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.buttonLogin} onPress={this.onPressForgotPassword}>
                    <Text>Send Reset Password</Text>
                </TouchableOpacity>
            </View>
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
})

export default ForgotPassword