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
import Firebase from '../../config/Firebase';
import Dropdown from '../Authentication/Dropdown.js';
import {UPAV} from '../Authentication/UserProfileAnswerView.js';
import SearchableDropdown from 'react-native-searchable-dropdown';

class EditProfile extends React.Component {

    db = Firebase.firestore();
    userID = Firebase.auth().currentUser.uid;
    unsubscribe; // used to stop checking firestore for updates

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
        // subscribes to the document holding the current user's profile details
        // renders updates on screen based on changes to firestore
        this.unsubscribe = this.db.collection("users").doc(this.userID).onSnapshot(
            doc => {
                this.setState({
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    major: doc.data().major,
                    year: doc.data().year,
                    bio: doc.data().bio
                })
            }
        );
    }

    /** Updates user data in firestore and navigates to EditProfile form */
    onPressSave() {
        var userID = Firebase.auth().currentUser.uid;
        // update user data
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

    /** Gets the initial user details */
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

    /** Initializes state variables based on the firestore data */
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

    /** Called on Settings screen being rendered */
    componentDidMount() {
        this.fetchUserDetails();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return(<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.container, styles.searchItem]}>
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
                <Dropdown
                    items={UPAV.getMajorsArray()}
                    value={this.state.major}
                    update={major => this.setState({ major })}
                    placeHolder='Major'
                />
                <Dropdown
                    items={UPAV.getYearsArray()}
                    value={this.state.year}
                    update={year => this.setState({ year })}
                    placeHolder='Graduation Year'
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
    },

})

export default EditProfile;