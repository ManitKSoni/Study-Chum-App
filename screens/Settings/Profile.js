import React from 'react';
import {View, TextInput, Button, Keyboard, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Firebase from '../../config/Firebase';

class Profile extends React.Component {
    state = {
        name: '',
        major: '',
        classes: '',
        bio: ''
    }

    constructor(props) {
        super(props);
        this.onPressContinue = this.onPressContinue.bind(this);
    }

    onPressSave() {

    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <div>


                <View style={styles.container}>
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        placeholder='Name'
                    />
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.major}
                        onChangeText={major => this.setState({ major })}
                        placeholder='Major'
                    />
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.classes}
                        onChangeText={classes => this.setState({ classes })}
                        placeholder='Classes'
                    />
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.bio}
                        onChangeText={bio => this.setState({ bio })}
                        placeholder='Bio'
                    />
                    <Button title="Save" onPress={this.onPressSave}/>
                </View>
                </div>
            </TouchableWithoutFeedback>
        );
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

export default Profile;