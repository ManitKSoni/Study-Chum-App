import React, { Fragment, Component}  from 'react';
import {Keyboard, StyleSheet, Text, Image, TouchableWithoutFeedback, View,SafeAreaView,
    StatusBar,
    Dimensions,
    TouchableOpacity, DeviceEventEmitter} from 'react-native';
import Firebase from '../../config/Firebase';
import * as ImagePicker from "expo-image-picker";
import * as Constants from '../../Constants.js'
import userInstance from "../Singletons/UserSingleton";

//ensures size is proportional across devices
var imDiam = Math.sqrt(Math.pow(Constants.windowHeight, 2) + Math.pow(Constants.windowWidth, 2)) / 4;
class Settings extends React.Component{

    db = Firebase.firestore();
    userID = Firebase.auth().currentUser.uid;

    state = {
        userProfile : {
            firstName: '',
            lastName: '',
            major: '',
            year: '',
            language: '',
            bio: '',
        },
        image: null
    }



    constructor(props) {
        super(props);
        this.onPressLogOut = this.onPressLogOut.bind(this);
        this.onPressEditProfile = this.onPressEditProfile.bind(this);
        this.handleEvent = this.handleEvent.bind(this);

        this.props.route.params = ""; // initial value to prevent errors

        // pull user details from UserSingleton
        this.state.userProfile.bio = userInstance._user.bio;
        this.state.userProfile.firstName = userInstance._user.firstName;
        this.state.userProfile.lastName = userInstance._user.lastName;
        this.state.userProfile.major = userInstance._user.major;
        this.state.userProfile.year = userInstance._user.year;
    }

    /** Handle logging out and reset stack */
    onPressLogOut() {
        try {
            Firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    /** Navigates to EditProfile form */
    onPressEditProfile() {
        this.props.navigation.navigate("EditProfileMainScreen");
    }

    /** Called on Settings screen being rendered */
    componentDidMount() {
        this.renderFileData();
        this.eventListener = DeviceEventEmitter.addListener('eventKey',this.handleEvent);
    }

    handleEvent(profile) {
        this.setState({userProfile: profile})
    }

    /*
    * Opens the image picker on user's phone
    */
    chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if(!result.cancelled) {
            this.setState({image: result.uri});
            this.uploadImage(result.uri, this.userID)
                .then(() => {
                    console.log("Success")
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    /*
    * Uploads image to firebase using UID
    * @param uri - image uri that saves to firebase
    * @param userID - UID for unique key
    */
    uploadImage = async (uri, userID) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        var ref = Firebase.storage().ref().child("images/" + userID)
        return ref.put(blob);
    }

    /*
    * Retrieves image from firebase. If it does not exist,
    * the state will stay null
    */
    async renderFileData() {

        var storage = Firebase.storage();
        var imagePath = storage.ref('images/' + this.userID);
        try{
            var image = await imagePath.getDownloadURL();

            this.setState({image:image})
        } catch(err) {
            console.log("No image on database")
        }

    }

    /*
    * If the image state is null, show default image.
    * Otherwise show image from firebase
    */
    showImage = () => {
        if(!this.state.image) {
            return (<View style = {styles.contImg}>
                <Image source={require('../../assets/default_pic.png')} style={styles.img}/>
            </View>)
        } else {
            return (
                <View style ={styles.contImg}>
                    <Image source = {{uri:this.state.image}} style={styles.img}/>
                </View>
            )
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Fragment>
                        <StatusBar barStyle="dark-content" />
                        <SafeAreaView>
                            <View style={styles.body}>
                                <View style={styles.ImageSections}>
                                    <TouchableOpacity onPress={this.chooseImage} style={{
                                        height: imDiam, //Constants.windowHeight * 0.29,
                                        width: imDiam, //Constants.windowWidth * 0.55,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: imDiam / 2/*3*/}}>
                                        {this.showImage()}
                                        <View style ={styles.img_icon}>
                                            <Image source ={require('../../assets/edit_bubble_icon.png')} style={styles.img_icon}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={styles.textAlign}>
                                    <Text style={{textAlign:'center',fontSize:Constants.windowWidth*0.083,fontFamily: 'ProximaNova',paddingBottom:Constants.windowHeight * .010, paddingTop:Constants.windowHeight * .005}} >
                                        {this.state.userProfile.firstName + " " +  this.state.userProfile.lastName}
                                    </Text>
                                    <View style={styles.border}/>
                                    <Text style={{textAlign:'left', color: '#AAAAAA',fontSize:Constants.windowWidth*0.045, fontFamily: 'ProximaNova', paddingBottom:Constants.windowHeight * .012, paddingHorizontal:Constants.windowWidth * .035, paddingTop:Constants.windowHeight * .012}} >
                                        {this.state.userProfile.major + " " +  this.state.userProfile.year}
                                    </Text>
                                    <View style={styles.border}/>
                                    <Text style={{textAlign:'left', color: '#AAAAAA',fontSize:Constants.windowWidth*0.045, fontFamily: 'ProximaNova', paddingBottom:Constants.windowHeight * .012, paddingHorizontal:Constants.windowWidth * .035, paddingTop:Constants.windowHeight * .012}} >
                                        {this.state.userProfile.bio}
                                    </Text>
                                    <View style={styles.border}/>
                                </View>
                                <View style={styles.btnParentSection}>
                                    <TouchableOpacity onPress={this.onPressEditProfile} style={styles.btnSection}  >
                                        <Text style={styles.btnText}>Edit Profile</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.onPressLogOut} style={styles.logoutbtnText}  >
                                        <Text style={styles.logoutbtnText}>Log Out</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </SafeAreaView>
                    </Fragment>

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
        fontFamily: 'ProximaNova'
    },
    contImg : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    img: {
        height: imDiam, //Constants.windowHeight * 0.29,
        width: imDiam, //Constants.windowWidth * 0.55,
        borderRadius: imDiam / 2,
        backgroundColor: '#000'
    },
    img_icon: {
        height: Dimensions.get('screen').height * 0.05,
        width: Dimensions.get('screen').width * 0.10,
        left: Constants.windowWidth * 0.08,
        top: Constants.windowHeight * -0.01,
        backgroundColor: 'transparent'
    },
    border: {
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 1,
        marginLeft: Constants.windowWidth * .035,
        marginRight: Constants.windowWidth * .035,
    },
    body: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
        height: Dimensions.get('screen').height - 20,
        width: Dimensions.get('screen').width
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 0,
        justifyContent: 'center',
    },
    btnParentSection: {
        alignItems: 'center',
        marginTop:10
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
    logoutbtnSection: {
        width: 225,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        bottom: 0,
        borderRadius: 3,
        marginBottom:10
    },
    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: Constants.windowWidth*0.038,
        fontWeight:'bold',
        fontFamily: 'ProximaNova',
    },
    logoutbtnText: {
        textAlign: 'center',
        color: '#b80808',
        fontFamily: 'ProximaNova',
        fontSize: Constants.windowWidth*0.038,
        fontWeight:'bold'
    }
})

export default Settings;
