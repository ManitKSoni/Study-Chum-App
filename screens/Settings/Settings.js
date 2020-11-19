import React from 'react'
import {Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native'
// import ImagePicker from 'react-native-image-picker';
import Firebase from '../../config/Firebase'

class Settings extends React.Component{

    db = Firebase.firestore();

    state = {
        image: '',
        name: '',
        major: '',
        classes: '',
        bio: '',
        userDetails: ''
    }
    
    constructor() {
        super();
        this.onPressLogOut= this.onPressLogOut.bind(this)
    }

    /** Handle logging out and reset stack */
    onPressLogOut() {
        try {
            Firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    getUserDetails() {
        var userID = Firebase.auth().currentUser.uid;
        return this.db.collection("users")
            .doc(userID)
            .get()
            .then(function(doc) {
                return doc.data()
        })
            .catch(function(error) {
                console.log('Error getting user details: ', error)
            })
    }

    fetchUserDetails = async () => {
        try {
            const userDetails = await this.getUserDetails()
            this.setState({ userDetails })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.fetchUserDetails();
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
                        value={this.state.userDetails.name}
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
                    <Text>{this.state.userDetails.name}</Text>
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