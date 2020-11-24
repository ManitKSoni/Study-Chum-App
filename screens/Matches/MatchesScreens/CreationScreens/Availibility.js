import React from 'react'

import { View, Text } from 'react-native'

import {Switch, StyleSheet, TouchableWithoutFeedback, Keyboard, Button, ImageBackground, Image, TouchableOpacity } from 'react-native'
import PreferenceProfiles from "../../PreferenceProfiles"
import {Icon} from 'react-native-elements';
import * as Constants from '../../../../Constants.js'


class Availibility extends React.Component {
     

    state = {
        sunday: false,
        monday: false,
        tuesday: false,            
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
    }

    createAvailabilityMap() {
        var availability = {
            sunday: this.state.sunday,
            monday: this.state.monday,
            tuesday: this.state.tuesday,
            wednesday: this.state.wednesday,
            thursday: this.state.thursday,
            friday: this.state.friday,
            saturday: this.state.saturday
        };

        return availability;
    }

    onPressGoToMatches = () => {
        this.props.navigation.navigate("Matches");
    }

    onPressGoToRemote = () => {
        var availability = this.createAvailabilityMap();
        PreferenceProfiles.addAvailability(availability)
        this.props.navigation.navigate("Remote");
    }

    render() {
     
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container1}>
                    <Icon name="x" type="foundation" size={35} color="black" 
                        containerStyle={{paddingTop:25, paddingLeft:325}} 
                        onPress={this.onPressGoToMatches}
                    />
                <View style={styles.container2}>
                    <Text style={styles.header}> What days are you free?</Text>
                    <Text> Sunday </Text>
                    <Switch 
                        trackColor={{ false: "#FF0000", true: "00FF00" }}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(sunday) => this.setState({sunday})}
                        value={this.state.sunday}
                    />
                    <Text> Monday </Text>
                    <Switch 
                        trackColor={{ false: "#FF0000", true: "00FF00" }}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(monday) => this.setState({monday})}
                        value={this.state.monday}
                    />
                    <Text> Tuesday </Text>
                    <Switch 
                        trackColor={{ false: "#FF0000", true: "00FF00" }}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(tuesday) => this.setState({tuesday})}
                        value={this.state.tuesday}
                    />
                    <Text> Wednesday </Text>
                    <Switch 
                        trackColor={{ false: "#FF0000", true: "00FF00" }}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(wednesday) => this.setState({wednesday})}
                        value={this.state.wednesday}
                    />
                    <Text> Thursday </Text>
                    <Switch 
                        trackColor={{ false: "#FF0000", true: "00FF00" }}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(thursday) => this.setState({thursday})}
                        value={this.state.thursday}
                    />
                    <Text> Friday </Text>
                    <Switch 
                        trackColor={{ false: "#FF0000", true: "00FF00" }}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(friday) => this.setState({friday})}
                        value={this.state.friday}
                    />
                    <Text> Saturday </Text>
                    <Switch 
                        trackColor={{ false: "#FF0000", true: "00FF00" }}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(saturday) => this.setState({saturday})}
                        value={this.state.saturday}
                    />
                </View>
                <View style={styles.buttonLayer}>
                        <ImageBackground style={styles.waves} source={require('../../../../assets/wave.png')} >
                            <View style={styles.posFish}>
                                <TouchableOpacity onPress={()=>this.onPressGoToRemote()} >
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
    container1: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    container2: {
        paddingTop: 20,
        alignItems: 'center'
    },
    waves: {
        width: Constants.windowWidth,
        height: Constants.waveHeight * Constants.waveWidthRatio,
    },
    fishButton: {
        height: Constants.windowHeight * 0.20,
        width: Constants.windowWidth * 0.20,
        resizeMode: 'contain',
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
    header: {
        fontSize:24,
        paddingRight: 70,
        paddingBottom: 20
    },

})

export default Availibility; 