import React from 'react'

import { View, Text } from 'react-native'

import {Keyboard, StyleSheet, TouchableWithoutFeedback,  ImageBackground, Image, TouchableOpacity} from 'react-native'
import PreferenceProfiles from "../../Controllers/PreferenceProfiles"
import * as Constants from '../../../../Constants.js'
import {Icon} from 'react-native-elements';

class Remote extends React.Component {
     

    state = {
        remote: false
    }

    onPressToggle = (id) => {
        this.setState({remote:id});
    };

    onPressGoToMatches = () => {
        this.props.navigation.navigate("Matches");
        this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
            tabBarVisible: true
        });
    }

    onPressGoToQuiet = () => {
        console.log(this.state.remote);
        PreferenceProfiles.addRemote(this.state.remote); 
        this.props.navigation.navigate("Quiet");
    }

    render() {
        return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Icon name="x" type="foundation" size={35} color="black" 
                    containerStyle={styles.iconStyle}
                    onPress={this.onPressGoToMatches}
                />
                <Text style={styles.prompt}>Study environment?</Text>

                <View style={styles.buttonsContainer}>

                    <TouchableOpacity
                        activeOpacity = {0.9}
                        style = {this.state.remote === true ? styles.on : styles.off}
                        onPress={ ()=>this.onPressToggle(true) }>
                        <Text style={this.state.remote === true ? styles.buttonTextOn : styles.buttonTextOff}>Remote</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity = {0.9}
                        style = {this.state.remote === false ? styles.on : styles.off }
                        onPress={ ()=>this.onPressToggle(false) }>
                        <Text style={this.state.remote === false ? styles.buttonTextOn : styles.buttonTextOff}>IRL</Text>
                    </TouchableOpacity>
                </View>

                <ImageBackground style={styles.waves} source={require('../../../../assets/wave.png')} >
                    <View style={styles.posFish}>
                        <TouchableOpacity onPress={() => this.onPressGoToQuiet()} >
                            <Image style={styles.fishButton} source={require('../../../../assets/fish_button.png')} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: 'white',
       //alignItems: 'center',
       justifyContent: 'space-between',
       minHeight: Math.round(Constants.windowHeight)
    },
    iconStyle: {
        paddingTop: Constants.windowHeight * 0.05 ,
        paddingLeft: Constants.windowWidth * 0.85,
        backgroundColor: 'white',
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 999,
    },
    prompt: {
        paddingTop: Constants.windowHeight * .15,
        fontSize: Constants.windowWidth * 0.087,
        // lineHeight: 40,
        color: 'black',
        textAlign: 'left',
        letterSpacing: 0,
        alignSelf: 'flex-start',
        paddingLeft: Constants.windowWidth * .075,
        paddingBottom: Constants.windowHeight * .02,
        backgroundColor: 'white',
        width: '100%',
        fontFamily: 'Buenard-Bold'
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextOn: {
        fontFamily: 'ProximaNova',
        fontSize: Constants.windowWidth * 0.07,
        color: 'white',
        textAlign: 'center',
    },
    buttonTextOff: {
        fontFamily: 'ProximaNova',
        fontSize: Constants.windowWidth * 0.07,
        color: 'grey',
        textAlign: 'center',
    },
    on: {
        //backgroundColor: '#A8C0E6',
        backgroundColor: Constants.secondaryColor,
        padding: 10,
        borderColor: 'grey',
        //height: '25%',
        width: Constants.windowWidth * 0.33,
        borderWidth: 1,
        borderRadius: 5,
    },
    off: {
        backgroundColor:'white',
        padding: 10,
        borderColor: 'grey',
        //height: '25%',
        width: Constants.windowWidth * 0.33,
        borderWidth: 1,
        borderRadius: 5,
    },
    waves: {
        width: Constants.windowWidth,
        height: Constants.waveHeight * Constants.waveWidthRatio,
        //resizeMode: 'contain',
    },
    fishButton: {
        height: Constants.windowHeight * 0.20,
        width: Constants.windowWidth * 0.20,
        resizeMode: 'contain',
        //alignSelf: 'flex-end',
    },
    posFish: {
        flex: 1,
        alignSelf: 'flex-end',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingRight: Constants.waveWidth*0.01,
        paddingBottom: Constants.waveHeight * Constants.waveWidthRatio * 0.3,
    },
    buttonLayer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        zIndex: 0
    },
    
})

export default Remote; 