import React from 'react'

import { View, Text } from 'react-native'

import {Keyboard, Switch, StyleSheet, TouchableWithoutFeedback, Button,  ImageBackground, Image, TouchableOpacity} from 'react-native'
import PreferenceProfiles from "../PreferenceProfiles"
import * as Constants from '../../../Constants.js'
import {Icon} from 'react-native-elements';

class Remote extends React.Component {
     

    state = {
        remote: false
    }

    createAvailabilityMap() {
        return availability;
    }

    onPressGoToMatches = () => {
        this.props.navigation.navigate("Matches");
    }

    onPressGoToQuiet = () => {
        PreferenceProfiles.addRemote(this.state.remote); 
        this.props.navigation.navigate("Quiet");
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
                    <Text style={styles.text}> Online or offline? </Text>
                     <Switch 
                      trackColor={{ false: "#FF0000", true: "00FF00" }}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={(remote) => this.setState({remote})}
                      value={this.state.remote}
                    />  
                </View>
                <View style={styles.buttonLayer}>
                        <ImageBackground style={styles.waves} source={require('../../../assets/wave.png')} >
                            <View style={styles.posFish}>
                                <TouchableOpacity onPress={() => this.onPressGoToQuiet()} >
                                    <Image style={styles.fishButton} source={require('../../../assets/fish_button.png')} />
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
        paddingRight: 125,
        paddingBottom: 60
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

export default Remote; 