import React from 'react';
import {
    View,
    TextInput,
    Button,
    Keyboard,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
//import ImagePicker from 'react-native-image-picker';
import Firebase from '../../config/Firebase';
import {Image} from "react-native-web";

class EditProfile extends React.Component {

    db = Firebase.firestore();
    userID = Firebase.auth().currentUser.uid;
    unsubscribe;

    state = {
        firstName: '',
        lastName: '',
        major: '',
        year: '',
        bio: ''
    }

    constructor(props) {
        super(props);
        this.onPressSave = this.onPressSave.bind(this);
        this.unsubscribe = this.db.collection("users").doc(this.userID).onSnapshot(
            doc => {
                this.setState({
                    userDetails: doc.data()
                })
            }
        );
    }

    onPressSave() {
        var userID = Firebase.auth().currentUser.uid;
        this.db.collection('users').doc(userID).update({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            major: this.state.major,
            year: this.state.year,
            bio: this.state.bio
        });
        this.unsubscribe();
        this.props.navigation.navigate("Settings");
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
            this.setState({
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                major: userDetails.major,
                year: userDetails.year,
                bio: userDetails.bio
            })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.fetchUserDetails();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return(<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.firstName}
                    onChangeText={firstName => this.setState({ firstName })}
                    placeholder='First Name'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.lastName}
                    onChangeText={lastName => this.setState({ lastName })}
                    placeholder='Last Name'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.major}
                    onChangeText={major => this.setState({ major })}
                    placeholder='Major'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.year}
                    onChangeText={year => this.setState({ year })}
                    placeholder='Graduation Year'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.bio}
                    onChangeText={bio => this.setState({ bio })}
                    placeholder='Bio'
                    autoCapitalize='none'
                />
                <Button
                    style={styles.button}
                    title="Save"
                    onPress={this.onPressSave}
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

export default EditProfile;