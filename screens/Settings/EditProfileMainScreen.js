import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    DeviceEventEmitter
} from 'react-native';

import Firebase from '../../config/Firebase';
import * as Constants from '../../Constants.js'
import userInstance from "../Singletons/UserSingleton";



class EditProfileMainScreen extends React.Component {

    state = {
        userProfile: {
            firstName: '',
            lastName: '',
            major: '',
            year: '',
            language: '',
            bio: '',
            courses: ''
        }
    }

    constructor() {
        super()
        this.state.userProfile.bio = userInstance._user.bio;
        this.state.userProfile.firstName = userInstance._user.firstName;
        this.state.userProfile.lastName = userInstance._user.lastName;
        this.state.userProfile.major = userInstance._user.major;
        this.state.userProfile.language = userInstance._user.language;
        this.state.userProfile.year = userInstance._user.year;
        this.state.userProfile.courses = userInstance._user.courses;
        this.db = Firebase.firestore();
    }

    navigateToEdit(index) {
        console.log('navigating')
        console.log(this.state.userProfile)
        this.props.navigation.navigate('EditProfileScreen', {
            index: index,
            userProfile: this.state.userProfile
        });
        this.props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });
    }

    componentDidUpdate(prevProps) {

        if (prevProps.route.params?.profile !== this.props.route.params?.profile) {
            this.setState({ userProfile: this.props.route.params.profile })
        }
    }

    componentWillUnmount() {

        // updating user Singleton
        userInstance._user.firstName = this.state.userProfile.firstName;
        userInstance._user.lastName = this.state.userProfile.lastName;
        userInstance._user.major = this.state.userProfile.major;
        userInstance._user.year = this.state.userProfile.year;
        userInstance._user.bio = this.state.userProfile.bio;
        userInstance._user.language = this.state.userProfile.language;
        userInstance._user.courses = this.state.userProfile.courses;
        const userID = Firebase.auth().currentUser.uid;

        console.log(this.state.userProfile);

        // update user data
        this.db.collection('users').doc(userID).update({
            firstName: this.state.userProfile.firstName,
            lastName: this.state.userProfile.lastName,
            major: this.state.userProfile.major,
            year: this.state.userProfile.year,
            bio: this.state.userProfile.bio,
            language: this.state.userProfile.language
        });

        this.state.userProfile.courses.forEach((userCourse) => {
            var keyBio = 'students.'+ userID+'.bio';
            var keyName = 'students.'+ userID+'.name';
            this.db.collection('courses').doc(userCourse).update({
                [keyBio]: this.state.userProfile.bio,
                [keyName]: this.state.userProfile.firstName+ ' '+ this.state.userProfile.lastName,
            })
        })

        DeviceEventEmitter.emit('eventKey', this.state.userProfile)

        this.props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: true
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity
                    style={styles.border}
                    onPress={() => this.navigateToEdit(0)}>
                    <Text style={styles.text}> Name </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.border}
                    onPress={() => this.navigateToEdit(1)}>
                    <Text style={styles.text}> Major </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.border}
                    onPress={() => this.navigateToEdit(2)}>
                    <Text style={styles.text}> Year of Graduation </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.border}
                    onPress={() => this.navigateToEdit(3)}>
                    <Text style={styles.text}> Preferred Language </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.border}
                    onPress={() => this.navigateToEdit(4)}>
                    <Text style={styles.text}> Bio </Text>
                </TouchableOpacity>
            </View>

        )
    }
}

export default EditProfileMainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        backgroundColor: 'white',
    },
    container2: {
        alignItems: 'center',
        paddingBottom: 15,
        bottom: 0,
        position: 'absolute',
        width: '100%'
    },
    text: {
        fontSize: Constants.windowHeight * 0.04,
        color: 'grey',
        paddingVertical: 7,
        paddingLeft: 4,
        fontFamily: "ProximaNova"
    },
    deleteButton: {
        fontSize: Constants.windowHeight * 0.035,
        color: 'grey',
        margin: 5,
        fontFamily: "ProximaNova"
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginLeft: Constants.windowWidth * .025,
        width: '95%',
    },
    borderDelete: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        borderTopWidth: 1,
        borderTopColor: 'gray',
        margin: 6,
    }
})