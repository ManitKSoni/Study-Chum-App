import 'react-native-gesture-handler';

import React from 'react'

import { View, TextInput, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'

import Firebase from '../../config/Firebase'
import userInstance from '../Singletons/UserSingleton'

class CreateUserProfile extends React.Component {

    state = {
        name: '', 
        year: '',
        language: ''
    }

    constructor() {
        super()
        this.onPressContinue = this.onPressContinue.bind(this)
    }

    onPressContinue() {
        // TODO: check for correct input
        userInstance.createUser(this.state, () => {
            this.props.navigation.reset({
                index: 0, 
                routes: [{ name: 'Home'}]
            });
        });
    }

    // TODO: UI and add more fields
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        placeholder='Name'
                    />
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.language}
                        onChangeText={language => this.setState({ language })}
                        placeholder='Language'
                    />
                     <TextInput
                        style={styles.inputBox}
                        value={this.state.year}
                        onChangeText={year => this.setState({ year })}
                        placeholder='Year'
                    />
                    <Button title="Continue" onPress={this.onPressContinue}/>        
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
    },
    textForgotPassword: {
        padding: 10,
        color: '#FFA000',
        fontSize: 15
    }
})

export default CreateUserProfile