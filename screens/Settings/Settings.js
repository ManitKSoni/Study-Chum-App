import React, {useState} from 'react'
import {View, Button, Keyboard, TextInput, TouchableWithoutFeedback, StyleSheet} from 'react-native'
// import ImagePicker from 'react-native-image-picker';
import Firebase from '../../config/Firebase'
import {Image} from "react-native-web";
import Editable from "./Editable";

//const [task, setTask] = useState("");

class Settings extends React.Component{

    state = {
        image: '',
        name: '',
        major: '',
        classes: '',
        bio: ''
    }
    
    constructor() {
        super();
        this.onPressLogOut= this.onPressLogOut.bind(this)
        //this.onPressSubmit = this.onPressSubmit.bind(this);
    }

    /** Handle logging out and reset stack */
    onPressLogOut() {
        try {
            Firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    onPressSubmit() {

    }

    /** launches user's photo library to pick profile picture */
    /* selectImage = () => {
        const options= {
            noData: true
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            } else {
                const source = { uri: response.uri }
                console.log(source)
                this.setState({
                    image: source
                })
            }
        })
    } */

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Button
                        style={styles.button}
                        title="Log out"
                        onPress={this.onPressLogOut}
                    />
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
                    <Button
                        style={styles.button}
                        title="Submit"
                        onPress={this.onPressSubmit}
                    />

                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },

    inputBox: {
        width: '100%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'left'
    },

    button: {
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
    }

})

export default Settings