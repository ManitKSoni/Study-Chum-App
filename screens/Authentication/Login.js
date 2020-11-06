import 'react-native-gesture-handler';

import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'

import Firebase from '../../config/Firebase'

class Login extends React.Component {

    constructor() {
        super();
        this.onPressGoToSignUp = this.onPressGoToSignUp.bind(this)
        this.onPressLogin = this.onPressLogin.bind(this)
    }

    state = {
        email: '',
        password: ''
    }

    onPressGoToSignUp() {
        this.props.navigation.navigate('SignUp')
    }

    /** Basic regex validation that checks for the form _@_._
     * Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
     **/
    validateEmailExpression(email){
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    /** Reset the stack so that user can't go to login screen again **/
    resetStackAndNavigate(){
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    onPressLogin() {
        // Check input for good value
        const { email, password } = this.state
        if(email === '' || password === ''){
            alert("Empty fields! Please enter your information in all the fields.")
        } else if(this.validateEmailExpression(email) === false){
            alert("The email entered is invalid")
        } else{
            try {
                Firebase.auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(() => this.resetStackAndNavigate())
                    .catch(error => console.log(error))
            } catch (err) {
                alert(err);
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
                <TouchableOpacity style={styles.buttonLogin} onPress = {this.onPressLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <Text style={styles.textSignUp} onPress = {this.onPressGoToSignUp}>
                    Click Here to Sign Up for an account!
                </Text>
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
    textSignUp: {
        padding: 10,
        color: '#007AFF',
        fontSize: 15
    }
})

export default Login