import React from 'react'
import {
    Keyboard, StyleSheet, Text, Image, TouchableWithoutFeedback, View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Firebase from '../../../../config/Firebase'
import SavedData from "../../Controllers/SavedData"
import ChatDataModel from "../../../Chat/ChatDataModel"
import * as Constants from '../../../../Constants.js'
import { Icon } from 'react-native-elements';

imDiam = Math.sqrt(Math.pow(Constants.windowHeight, 2) + Math.pow(Constants.windowWidth, 2)) / 4;
class UserProfile extends React.Component {

    userID = this.props.route.params.userID
    uri = this.props.route.params.URI;
    profile = SavedData.profile;
    chatDataModel = new ChatDataModel()


    goToChannel() {
        this.chatDataModel.getChannel(this.userID, `${this.profile.firstName} ${this.profile.lastName}`, (userData) => {
            this.props.navigation.navigate("ChatChannel", {
                userData: userData,
                uid: Firebase.auth().currentUser.uid,
                title: `${this.profile.firstName} ${this.profile.lastName}`
            });
        })
        this.props.navigation.setOptions({
            tabBarVisible: false
        });
    }

    /*
    * If the image state is null, show default image.
    * Otherwise show image from firebase
    */
    showImage = () => {
        if (!this.uri) {
            return (
                <View style={styles.contImg}>
                    <Image source={require('../../../../assets/default_pic.png')} style={styles.img} />
                </View>
            )
        } else {
            return (
                <View style={styles.contImg}>
                    <Image source={{ uri: this.uri }} style={styles.img} />
                </View>
            )
        }
    }

    /**
    onPressGoBack = () => {
        this.props.navigation.navigate("ShowMatches");
    } **/

    componentWillUnmount() {
        this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
            tabBarVisible: true
        });
    }

    render() {

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Icon name="chevron-left" type="octicon" size={40} color={Constants.primaryColor}
                        containerStyle={styles.iconStyle}
                        onPress={() => this.props.navigation.pop()}
                    />
                    <View style={styles.body}>
                        <View style={styles.ImageSections}>
                            <View style={{
                                height: imDiam, //Constants.windowHeight * 0.29,
                                width: imDiam, //Constants.windowWidth * 0.55,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: imDiam / 2,
                                }}>
                                {this.showImage()}
                            </View>
                        </View>

                        <Text style={{ textAlign: 'center', fontSize: Constants.windowWidth * 0.083, fontFamily: 'ProximaNova', paddingBottom: Constants.windowHeight * .010, paddingTop: Constants.windowHeight * .005 }} >
                            {this.profile.firstName + " " + this.profile.lastName}</Text>
                        <View style={styles.border} />
                        <Text style={{ textAlign: 'left', color: '#AAAAAA', fontSize: Constants.windowWidth * 0.045, fontFamily: 'ProximaNova', paddingBottom: Constants.windowHeight * .012, paddingHorizontal: Constants.windowWidth * .035, paddingTop: Constants.windowHeight * .012 }} >
                            {this.profile.major + ", " + this.profile.year} </Text>
                        <View style={styles.border} />
                        <Text style={{ textAlign: 'left', color: '#AAAAAA', fontSize: Constants.windowWidth * 0.045, fontFamily: 'ProximaNova', paddingBottom: Constants.windowHeight * .012, paddingHorizontal: Constants.windowWidth * .035, paddingTop: Constants.windowHeight * .012 }} >
                            {"Preferred Language: " + this.profile.language} </Text>
                        <View style={styles.border} />
                        <Text style={{ textAlign: 'left', color: '#AAAAAA', fontSize: Constants.windowWidth * 0.045, fontFamily: 'ProximaNova', paddingBottom: Constants.windowHeight * .012, paddingHorizontal: Constants.windowWidth * .035, paddingTop: Constants.windowHeight * .012 }} >
                            {this.profile.bio} </Text>
                        <View style={styles.border} />
                        <View style={styles.btnPosition}>
                        <TouchableOpacity style={styles.btnContainer} onPress={() => { this.goToChannel() }}>
                            <Text style={styles.btnText}>Send a message</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        fontFamily: 'ProximaNova'
    },
    contImg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    img: {
        height: imDiam, //Constants.windowHeight * 0.29,
        width: imDiam, //Constants.windowWidth * 0.55,
        borderRadius: imDiam / 2,
        backgroundColor: '#000',
        borderWidth: 2,
        borderColor: "grey", 
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
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        width: '95%'
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 0,
        justifyContent: 'center',
    },
    iconStyle: {
        paddingTop: Constants.windowHeight * 0.035,
        paddingLeft: Constants.windowWidth * 0.025,
        backgroundColor: 'white',
        position: 'absolute',
        alignSelf: 'flex-start',
        zIndex: 999,
    },
    btnContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Constants.primaryColor,
        width: Constants.windowWidth * .60,
        height: Constants.windowHeight * .055,
        borderRadius: Constants.windowWidth * .03
    },
    btnText: {
        fontSize: Constants.windowWidth * .06,
        color: "white",
        fontFamily: "ProximaNova",
    },
    btnPosition: {
        padding: Constants.windowHeight*0.02,
        alignItems: 'center',
    }

})

export default UserProfile