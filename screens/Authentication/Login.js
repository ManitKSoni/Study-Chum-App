import 'react-native-gesture-handler';

import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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

    onPressLogin() {
        // Check input for good value
        // Call to server to authenticate
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
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
                <TouchableOpacity style={styles.buttonLogin}>
                    <Text onPress = {this.onPressLogin}>Login</Text>
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