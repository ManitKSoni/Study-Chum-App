import React from 'react'
import {Button, Keyboard, StyleSheet, Text, Image, TextInput, TouchableWithoutFeedback, View} from 'react-native'
//import ImagePicker from 'react-native-image-picker';
//import { Text, Button, withStyles, Avatar, Icon} from 'react-native-ui-kitten';
import Firebase from '../../config/Firebase';


class Settings extends React.Component{

    db = Firebase.firestore();
    userID = Firebase.auth().currentUser.uid;
    unsubscribe;

    state = {
        bio: '',
        userDetails: ''
    }
    
    constructor(props) {
        super(props);
        this.onPressLogOut = this.onPressLogOut.bind(this);
        this.onPressEditProfile = this.onPressEditProfile(this);
        // subscribes to the document holding the current user's profile details
        // renders updates on screen based on changes to firestore
        this.unsubscribe = this.db.collection("users").doc(this.userID).onSnapshot(
            doc => {
                this.setState({
                    userDetails: doc.data()
                })
            }
        );
    }

    /** Handle logging out and reset stack */
    onPressLogOut() {
        this.unsubscribe();
        try {
            Firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    /** Navigates to EditProfile form */
    onPressEditProfile() {
        this.props.navigation.navigate("EditProfile");
    }

    /** Gets the initial user details */
    getUserDetails() {
        return this.db.collection("users")
            .doc(this.userID)
            .get()
            .then(function(doc) {
                return doc.data()
        })
            .catch(function(error) {
                console.log('Error getting user details: ', error)
            })
    }

    /** Initializes state variables based on the firestore data */
    fetchUserDetails = async () => {
        try {
            const userDetails = await this.getUserDetails()
            this.setState({ userDetails })
        } catch (error) {
            console.log(error)
        }
    }

    /** Called on Settings screen being rendered */
    componentDidMount() {
        this.fetchUserDetails();
    }

    componentWillUnmount() {
        this.unsubscribe();
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
                    <Image
                        style={styles.image}
                        source={require('./tumblr_inline_pazyiucOAC1v37n4k_1280.jpg')}
                    />
                    <Text
                        style={styles.text}>
                        {this.state.userDetails.firstName + " " + this.state.userDetails.lastName}
                    </Text>
                    <Text
                        style={styles.text}>
                        {this.state.userDetails.major + " " + this.state.userDetails.year}
                    </Text>
                    <Text
                        style={styles.text}>
                        {this.state.userDetails.bio}
                    </Text>
                    <Button
                        style={styles.button}
                        title="Edit Profile"
                        onPress={this.onPressEditProfile}
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

    text: {
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
    },

    image: {
        alignSelf: 'center',
        width: 100,
        height: 100
    }

})

export default Settings;