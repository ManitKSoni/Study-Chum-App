import 'react-native-gesture-handler';
import React, { Component, Fragment } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ImageBackground, Image } from 'react-native'
import { HeaderBackButton } from '@react-navigation/stack';

import * as Constants from '../../Constants.js'
import Firebase from '../../config/Firebase'
import userInstance from '../Singletons/UserSingleton'

var years = [
    {
        id: 1,
        name: '2021',
    },
    {
        id: 2,
        name: '2022',
    },
    {
        id: 3,
        name: '2023',
    },
    {
        id: 4,
        name: '2024',
    },
    {
        id: 5,
        name: '2025',
    },
];

var Language = [
    {
        id: 1,
        name: 'English',
    },
    {
        id: 2,
        name: 'Spanish',
    },
    {
        id: 3,
        name: 'French',
    },
    {
        id: 4,
        name: 'German',
    },
    {
        id: 5,
        name: 'Chinese',
    },
    {
        id: 6,
        name: 'Japanese',
    },
    {
        id: 7,
        name: 'Korean',
    },
    {
        id: 8,
        name: 'Sanskrit',
    },
];


class UserProfileAnswerView extends React.Component {

    constructor() {
        super()
    }

    correctView() {
        switch (this.props.index) {
            case 1:
                return (
                    <View style={styles.answer}>
                        <TextInput
                            style={styles.inputBox}
                            value={this.props.profile.firstName}
                            onChangeText={firstName => this.props.update('firstName', firstName)}
                            placeholder='First Name'
                        />
                        <TextInput
                            style={styles.inputBox}
                            value={this.props.profile.lastName}
                            onChangeText={lastName => this.props.update('lastName', lastName)}
                            placeholder='Last Name'
                        />
                    </View>
                )
            case 2:
                // TODO: Make this a dropdown 
                return (
                    <View style={styles.answer}>
                        <TextInput
                            style={styles.inputBox}
                            value={this.props.profile.major}
                            onChangeText={major => this.props.update('major', major)}
                            placeholder='Major'
                        />
                    </View>

                )
            case 0:
                return (
                    <Fragment>
                        <SearchableDropdown
                            onItemSelect={(item) => {
                                //this.setState({ userProfile.year : items });
                                this.props.update('year', item.name)
                                console.log(this.props.profile)
                            }}
                            containerStyle={{ padding: 5 }}
                            itemStyle={{
                                padding: 10,
                                marginTop: 2,
                                backgroundColor: '#ddd',
                                borderColor: '#bbb',
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                            itemTextStyle={{ color: '#222' }}
                            itemsContainerStyle={{ maxHeight: 115 }}
                            items={years}
                            //defaultIndex={2}
                            resetValue={false}
                            textInputProps={
                                {
                                    placeholder: "choose a year!",
                                    underlineColorAndroid: "transparent",
                                    style: {
                                        padding: 12,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 5,
                                    },
                                }
                            }
                            listProps={
                                {
                                    nestedScrollEnabled: true,
                                }
                            }
                        />
                    </Fragment>
                )
            case 3:
                return (
                    <View style={styles.answer}>
                        <TextInput
                            style={styles.inputBox}
                            value={this.props.profile.language}
                            onChangeText={language => this.props.update('language', language)}
                            placeholder='Language'
                        />
                    </View>
                )
            case 4:
                return (
                    <View style={styles.answer}>
                        <TextInput
                            style={styles.inputBox}
                            value={this.props.profile.bio}
                            onChangeText={bio => this.props.update('bio', bio)}
                            placeholder='Bio'
                        />
                    </View>
                )
            default:
                return (
                    <View></View>
                )
        }
    }
    render() {
        return (
            <View>
                {this.correctView()}
            </View>
        )
    }
}
class CreateUserProfile extends React.Component {

    state = {
        index: 0,
        userProfile: {
            firstName: '',
            lastName: '',
            major: '',
            year: '',
            language: '',
            bio: '',
            courses: []
        }
    }

    updateUser = (key, value) => {
        this.state.userProfile[key] = value
        this.setState({ userProfile: this.state.userProfile })
    }

    questions = (index) => {
        switch (index) {
            case 0:
                return "What's your name?"
            case 1:
                return "What's your major?"
            case 2:
                return "What year are you graduating?"
            case 3:
                return "What is your preferred language?"
            case 4:
                return "Tell us a little about yourself!"
            default:
                return ""
        }
    }

    constructor() {
        super()
        this.onPressContinue = this.onPressContinue.bind(this)
    }


    onPressContinue() {
        if (this.state.index < 4) {
            this.setState({ index: this.state.index + 1 })
        } else {
            userInstance.createUser(this.state.userProfile, () => {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }]
                });
            });
        }
    }

    // TODO: UI and add more fields
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Text style={styles.question}>{this.questions(this.state.index)}</Text>
                    <UserProfileAnswerView style={{ zIndex: 9999 }} index={this.state.index} profile={this.state.userProfile} update={this.updateUser} />
                    <View style={styles.buttonLayer}>
                        <ImageBackground style={styles.waves} source={require('../../assets/wave.png')} >
                            <View style={styles.posFish}>
                                <TouchableOpacity onPress={() => this.onPressContinue()} >
                                    <Image style={styles.fishButton} source={require('../../assets/fish_button.png')} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
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
        justifyContent: 'center',
    },

    inputBox: {
        width: '85%',
        margin: 16,
        fontFamily: 'ProximaNova',
        alignSelf: 'center',
        fontSize: 24,
        borderColor: Constants.boxGrey,
        borderBottomWidth: .5,
        textAlign: 'left'
    },

    question: {
        paddingTop: Constants.windowHeight * .15,
        fontSize: 36,
        fontFamily: 'MrsEaves-Bold',
        lineHeight: 40,
        color: 'black',
        textAlign: 'left',
        letterSpacing: 0,
        alignSelf: 'flex-start',
        paddingBottom: Constants.windowHeight * .02,
        padding: Constants.windowWidth * .1,
    },

    answer: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 15
    },

    buttonLayer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        zIndex: 0
    },
    waves: {
        width: Constants.windowWidth,
        height: Constants.waveHeight * Constants.waveWidthRatio,
        resizeMode: 'contain',

    },
    fishButton: {
        height: Constants.windowHeight * 0.20,
        width: Constants.windowWidth * 0.20,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
    },
    posFish: {
        flex: 1,
        alignSelf: 'flex-end',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingRight: 20,
        paddingBottom: 45,
    },

})

export default CreateUserProfile