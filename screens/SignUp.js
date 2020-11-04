import 'react-native-gesture-handler';

import React from 'react'
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Firebase from '../config/Firebase'

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

    /** Basic regex validation that checks for the form _@_._
     * Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
     **/
    validateEmailExpression(email){
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    /** Check that the password the user enter matches their confirmation password **/
    checkPasswordsMatch() {
        return this.state.password === this.state.passwordConfirm;
    }

    onPressSignUp(){
        const { email, password, passwordConfirm } = this.state
        if(email === '' || password === '' || passwordConfirm === ''){
            alert("Empty fields! Please enter your information in all the fields.")
        }
        else if(this.validateEmailExpression(email) && this.checkPasswordsMatch()){
            Firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => this.props.navigation.navigate('Login'))
                .catch(error => console.log(error))
        } else{
            alert("Invalid Credentials. Please try again.")
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder='UCSD Email'
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
                    onChangeText={passwordConfirm=> this.setState({ passwordConfirm })}
                    placeholder='Confirm Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.buttonSignUp}>
                    <Text onPress={this.onPressSignUp}>Sign Up</Text>
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