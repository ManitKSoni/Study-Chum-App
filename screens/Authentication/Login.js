import 'react-native-gesture-handler';

import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, Image } from 'react-native'

import Firebase from '../../config/Firebase'
import userInstance from '../Singletons/UserSingleton'

class Login extends React.Component {

    constructor() {
        super();
        this.onPressGoToSignUp = this.onPressGoToSignUp.bind(this)
        this.onPressLogin = this.onPressLogin.bind(this)
        this.onPressGoToForgotPassword = this.onPressGoToForgotPassword.bind(this)
    }

    state = {
        email: '',
        password: ''
    }

    /** Navigate to sign up **/
    onPressGoToSignUp() {
        this.props.navigation.navigate('SignUp')
    }

    /** Navigate to forgot password **/
    onPressGoToForgotPassword() {
        this.props.navigation.navigate('ForgotPassword')
    }

    /** Reset the stack so that user can't go to login screen again **/
    resetStackAndNavigate() {
        const user = Firebase.auth().currentUser
        if (user) {
            userInstance.loadUser(user.uid) // Loads the user singleton
        }
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    /**
     * Handles errors received from Firebase and alerts the user.
     * https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
     */
    loginErrorCodes(error) {
        switch (error.code) {
            case 'auth/invalid-email':
                alert('That email address is invalid!')
                break;
            case 'auth/wrong-password':
                alert('Incorrect password. Please try again!')
                break;
            case 'auth/user-disabled':
                alert('The user has been disabled!')
                break;
            case 'auth/user-not-found':
                alert('The user was not found!')
                break;
            default:
                console.error(error)
        }
    }

    /** Handle logging in */
    onPressLogin() {
        const { email, password } = this.state
        if (email === '' || password === '') {
            alert("Empty fields! Please enter your information in all the fields.")
        } else {
            try {
                Firebase.auth().signOut();
                Firebase.auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(() => {
                        //this.resetStackAndNavigate()
                    })
                    .catch(error => this.loginErrorCodes(error))
            } catch (error) {
                console.error(error);
            }
        }
    }


    tiltAngle() {
        let tilt = Math.random() * 180
        return Math.random() < .5 ?  -1 * tilt : tilt
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Image style={{ width: 140, height: 120 , transform: [{rotate: `${this.tiltAngle()}deg`}]}} source={require('../../assets/study_chums_logo.png')} />
                    <Image style={{ width: 150, height: 120}} source={require('../../assets/sick_logo.png')} />
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
                        // secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.buttonLogin} onPress={this.onPressLogin}>
                        <Text style={styles.papyrus}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.textSignUp} onPress={this.onPressGoToSignUp}>
                        Click Here to Sign Up for an account!
                    </Text>
                    <Text style={styles.textForgotPassword} onPress={this.onPressGoToForgotPassword}>
                        Forgot Password?
                    </Text>
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
        fontFamily: 'Papyrus'

    },

    papyrus: {
        fontFamily: 'Papyrus'
    },

    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'left',
        fontFamily: 'Papyrus'
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
        fontSize: 15,
        fontFamily: 'Papyrus'
    },
    textSignUp: {
        padding: 10,
        color: '#007AFF',
        fontSize: 15, 
        fontFamily: 'Papyrus'
    },
    textForgotPassword: {
        padding: 10,
        color: '#FFA000',
        fontSize: 15,
        fontFamily: 'Papyrus'
    }
})

export default Login