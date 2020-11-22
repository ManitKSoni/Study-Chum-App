import 'react-native-gesture-handler';

import React from 'react'
import { Dimensions, View, TextInput, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, Image } from 'react-native'

import Firebase from '../../config/Firebase'
import userInstance from '../Singletons/UserSingleton'
import { RotationGestureHandler } from 'react-native-gesture-handler';
import * as Constants from '../../Constants.js'

//const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;
const logoHeight = 443;
const logoWidth = 512
const logoRatio = Constants.windowWidth / logoWidth;

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

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <View style={styles.container}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.studyChumsLogo} source={require('../../assets/study_chums_logo.png')} />
                        <Image style={styles.studyChumsTextLogo} source={require('../../assets/logo_trimmed.png')} />
                    </View>

                    <View style={styles.loginContainer}>
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
                        <Text style={styles.textForgotPassword} onPress={this.onPressGoToForgotPassword}>
                            Forgot Password?
                        </Text>
                        <TouchableOpacity style={styles.buttonLogin} onPress={this.onPressLogin}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Log In</Text>
                        </TouchableOpacity>
                    </View>



                    <Text style={styles.textSignUp} onPress={this.onPressGoToSignUp}>
                        Don't have an account? Sign up
                    </Text>


                </View>

            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        alignContent: 'flex-start',
        fontFamily: 'ProximaNova',
        height: '100%',
        flex: 1,
    },
    ProximaNova: {
        fontFamily: 'ProximaNova'
    },
    loginContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        alignContent: 'flex-start',
        width: '100%',
        fontFamily: 'ProximaNova',
        height: '100%',
    },
    imgContainer: {
        paddingTop: Constants.windowHeight / 15,
        flexDirection: 'column',
        resizeMode: 'contain',
        alignItems: 'center'
    },

    studyChumsLogo: {
        resizeMode: 'contain',
        width: Constants.windowWidth,//windowWidth,
        height: logoHeight * logoRatio,
        maxHeight: Constants.windowHeight / 5,
        overflow: 'hidden',
        justifyContent: 'space-around',
        transform: [{rotate: `331deg`}], //331 normal
    },
    studyChumsTextLogo: {
        maxWidth: (9 * Constants.windowWidth / 10),
        maxHeight: Constants.windowHeight / 7,
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    inputBox: {
        width: '85%',
        margin: 5,
        padding: 15,
        fontSize: 16,
        borderColor: Constants.boxGrey,
        borderBottomWidth: 1,
        textAlign: 'left',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        fontFamily: 'ProximaNova'
    },
    buttonLogin: {
        marginTop: Constants.windowHeight*.02,
        marginBottom: 5,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: Constants.primaryColor,
        borderColor: Constants.primaryColor,
        borderWidth: 1,
        borderRadius: 5,
        width: '85%',
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'ProximaNova',
        
    },
    textSignUp: {
        position: 'absolute',
        top: Constants.windowHeight*.9,
        padding: 10,
        color: Constants.boxGrey,
        fontSize: 15,
        fontFamily: 'ProximaNova',
    },
    textForgotPassword: {
        fontSize: 12,
        fontFamily: 'ProximaNova',
        color: Constants.boxGrey,
        textAlign: 'right',
        alignSelf: 'flex-end',
        paddingRight: Constants.windowWidth*.075
    }
})

export default Login