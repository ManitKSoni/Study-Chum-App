<<<<<<< HEAD
import React from 'react';
import {
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import Firebase from '../../config/Firebase';
import Dropdown from '../Authentication/Dropdown.js';
import {UPAV} from '../Authentication/UserProfileAnswerView.js';
import * as Constants from '../../Constants.js'
import SearchableDropdown from 'react-native-searchable-dropdown';
import userInstance from "../Singletons/UserSingleton";
import Settings from "./Settings";

class EditProfile extends React.Component {

    db = Firebase.firestore();
    userID = Firebase.auth().currentUser.uid;

    state = {
        firstName: '',
        lastName: '',
        major: '',
        year: '',
        bio: '',
        courses: [],
    }

    constructor(props) {
        super(props);
        this.onPressSave = this.onPressSave.bind(this);

        // pull user details from UserSingleton
        this.state.bio = userInstance._user.bio;
        this.state.firstName = userInstance._user.firstName;
        this.state.lastName = userInstance._user.lastName;
        this.state.major = userInstance._user.major;
        this.state.year = userInstance._user.year;
        this.state.courses = userInstance._user.courses;
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
            bio: this.state.bio,
            
        });
        // updating user Singleton
        userInstance._user.firstName = this.state.firstName;
        userInstance._user.lastName = this.state.lastName;
        userInstance._user.major = this.state.major;
        userInstance._user.year = this.state.year;
        userInstance._user.bio = this.state.bio;
        
        // updated bio and name on matches
        for (let userCourse of this.state.courses){
            var keyBio = 'students.'+ userID+'.bio';
            var keyName = 'students.'+ userID+'.name';
            this.db.collection('courses').doc(userCourse).update({
                [keyBio]: this.state.bio,
                [keyName]: this.state.firstName+ ' '+ this.state.lastName,
            })
        }
    


        this.props.navigation.navigate("Settings", {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            major: this.state.major,
            year: this.state.year,
            bio: this.state.bio,
        });
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
                    placeHolder={this.state.major}
                />
                <Dropdown
                    items={UPAV.getYearsArray()}
                    value={this.state.year}
                    update={year => this.setState({ year })}
                    placeHolder={this.state.year}
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.bio}
                    marginHorizontal={2}
                    maxLength={140}
                    onChangeText={bio => this.setState({ bio })}
                    placeholder={this.state.bio}
                    autoCapitalize='none'
                />
                <TouchableOpacity onPress={this.onPressSave} style={styles.btnSection}  >
                    <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
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
        textAlign: 'left',
        paddingHorizontal: 20
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
    btnSection: {
        width: 225,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom:10
    },
    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight:'bold'
    }
})

export default EditProfile;
=======
import React from 'react';
import {
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import Firebase from '../../config/Firebase';
import Dropdown from '../Authentication/Dropdown.js';
import {UPAV} from '../Authentication/UserProfileAnswerView.js';
import * as Constants from '../../Constants.js'
import SearchableDropdown from 'react-native-searchable-dropdown';
import userInstance from "../Singletons/UserSingleton";
import Settings from "./Settings";

class EditProfile extends React.Component {

    db = Firebase.firestore();
    userID = Firebase.auth().currentUser.uid;

    state = {
        firstName: '',
        lastName: '',
        major: '',
        year: '',
        bio: '',
    } 

    constructor(props) {
        super(props);
        this.onPressSave = this.onPressSave.bind(this);

        // pull user details from UserSingleton
        this.state.bio = userInstance._user.bio;
        this.state.firstName = userInstance._user.firstName;
        this.state.lastName = userInstance._user.lastName;
        this.state.major = userInstance._user.major;
        this.state.year = userInstance._user.year;
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
            bio: this.state.bio,
        });
        // updating user Singleton
        userInstance._user.firstName = this.state.firstName;
        userInstance._user.lastName = this.state.lastName;
        userInstance._user.major = this.state.major;
        userInstance._user.year = this.state.year;
        userInstance._user.bio = this.state.bio;

        this.props.navigation.navigate("Settings", {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            major: this.state.major,
            year: this.state.year,
            bio: this.state.bio,
        });
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
                    placeHolder={this.state.major}
                />
                <Dropdown
                    items={UPAV.getYearsArray()}
                    value={this.state.year}
                    update={year => this.setState({ year })}
                    placeHolder={this.state.year}
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.bio}
                    marginHorizontal={2}
                    maxLength={140}
                    onChangeText={bio => this.setState({ bio })}
                    placeholder={this.state.bio}
                    autoCapitalize='none'
                />
                <TouchableOpacity onPress={this.onPressSave} style={styles.btnSection}  >
                    <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
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
        textAlign: 'left',
        paddingHorizontal: 20
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
    btnSection: {
        width: 225,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom:10
    },
    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight:'bold'
    }
})

export default EditProfile;
>>>>>>> aa1598fb31804d51ea03444cfa842c96fdd323af
