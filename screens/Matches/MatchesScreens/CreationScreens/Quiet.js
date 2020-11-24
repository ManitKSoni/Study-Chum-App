import React from 'react'

import { View, Text } from 'react-native'

import {Keyboard, Switch, StyleSheet, TouchableWithoutFeedback, Button,  ImageBackground, Image, TouchableOpacity} from 'react-native'
import * as Constants from '../../../../Constants.js'
import PreferenceProfiles from "../../PreferenceProfiles";
import {Icon} from 'react-native-elements';

class Quiet extends React.Component {

    state = {
        quiet: false 
    }

    onPressGoToMatches = () => {
        this.props.navigation.navigate("Matches");
    }


    generateMatches = () => {
        PreferenceProfiles.addQuiet(this.state.quiet);
        PreferenceProfiles.addAndShow(this.props);
    }

    render() {
     
        return(
     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Icon name="x" type="foundation" size={35} color="black" 
                    containerStyle={{paddingTop:25, paddingLeft:325}} 
                    onPress={this.onPressGoToMatches}
                />
                <View style={styles.container}>
                    <Text style={styles.text}> Chill? </Text>
                     <Switch 
                      trackColor={{ false: "#FF0000", true: "00FF00" }}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={(quiet) => this.setState({quiet})}
                      value={this.state.quiet}
                    />  
                </View>
                <View style={styles.buttonLayer}>
                        <ImageBackground style={styles.waves} source={require('../../../../assets/wave.png')} >
                            <View style={styles.posFish}>
                                <TouchableOpacity onPress={() => this.generateMatches()} >
                                    <Image style={styles.fishButton} source={require('../../../../assets/fish_button.png')} />
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:20
    },
    text: {
        fontSize: 30,
        paddingRight: 260,
        paddingBottom: 60,
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
    buttonLayer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        zIndex: 0
    },
})

export default Quiet; 