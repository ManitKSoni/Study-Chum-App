import React,{ Fragment, Component }  from 'react';
import {Keyboard, StyleSheet, Text, Image, TouchableWithoutFeedback, View,SafeAreaView,
    StatusBar,
    Dimensions,
    TouchableOpacity} from 'react-native';
import Firebase from '../../config/Firebase';
import * as ImagePicker from "expo-image-picker";
import * as Constants from '../../Constants.js'
import { BottomNavigation } from 'react-native-paper';
import userInstance from "../Singletons/UserSingleton";


class Settings extends React.Component{

    db = Firebase.firestore();
    userID = Firebase.auth().currentUser.uid;

    state = {
        firstName: '',
        lastName: '',
        major: '',
        year: '',
        bio: '',
        image: null
    }


    constructor(props) {
        super(props);
        this.onPressLogOut = this.onPressLogOut.bind(this);
        this.onPressEditProfile = this.onPressEditProfile.bind(this);

        this.props.route.params = ""; // initial value to prevent errors

        // pull user details from UserSingleton
        this.state.bio = userInstance._user.bio;
        this.state.firstName = userInstance._user.firstName;
        this.state.lastName = userInstance._user.lastName;
        this.state.major = userInstance._user.major;
        this.state.year = userInstance._user.year;
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
        this.props.navigation.navigate("EditProfile");
    }

    /** Called on Settings screen being rendered */
    componentDidMount() {
        this.renderFileData();
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
            console.log("In library")
            this.setState({image: result.uri});
            console.log(this.state.image);
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
                <Image source={require('../../assets/dummy.png')} style={styles.img}/>
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
                                        height: Constants.windowHeight * 0.35,
                                        width: Constants.windowWidth * 0.4,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 3}}>
                                        {this.showImage()}
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={styles.textAlign}>
                                    <Text style={{textAlign:'center',fontSize:30,fontFamily: 'ProximaNova',paddingBottom:Constants.windowHeight * .03, paddingTop:Constants.windowHeight * .02}} >
                                        {(this.props.route.params.firstName || this.state.firstName) + " " + (this.props.route.params.lastName || this.state.lastName)}
                                    </Text>
                                    <Text style={{textAlign:'left', color: '#AAAAAA',fontSize:20, fontFamily: 'ProximaNova', paddingBottom:Constants.windowHeight * .012, paddingHorizontal:Constants.windowWidth * .035}} >
                                        {(this.props.route.params.major || this.state.major) + " " + (this.props.route.params.year || this.state.year)}
                                    </Text>
                                    <Text style={{textAlign:'left', color: '#AAAAAA',fontSize:20, fontFamily: 'ProximaNova', paddingBottom:Constants.windowHeight * .012, paddingHorizontal:Constants.windowWidth * .035}} >
                                        {this.props.route.params.bio || this.state.bio}
                                    </Text>
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

    afterPic: {
        flex: 1,
        paddingTop:20,
        alignItems: 'center'
    },
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
        height: 200,
        width: 200,
        borderRadius: 100,
        backgroundColor: '#000'
    },

    text: {
        width: '100%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'left',
        fontFamily: 'ProximaNova'
    },

    button: {
        marginTop: 5,
        marginBottom: 5,
        paddingVertical: 15,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        textAlign: 'center',
        fontFamily: 'ProximaNova',
        fontSize: 15
    },

    image: {
        alignSelf: 'center',
        width: 100,
        height: 100
    },
    scrollView: {
        backgroundColor: '#F6820D',
    },

    body: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
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
    images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
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
        fontSize: 14,
        fontWeight:'bold',
        fontFamily: 'ProximaNova',
    },
    logoutbtnText: {
        textAlign: 'center',
        color: '#B80808',
        fontFamily: 'ProximaNova',
        fontSize: 14,
        fontWeight:'bold'
    }
})

export default Settings;
