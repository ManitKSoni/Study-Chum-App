import React from 'react'

import { View, Text } from 'react-native'

import {Switch, StyleSheet, TouchableWithoutFeedback, Keyboard, Button, ImageBackground, Image, TouchableOpacity } from 'react-native'
import PreferenceProfiles from "../../PreferenceProfiles"
import {Icon} from 'react-native-elements';
import * as Constants from '../../../../Constants.js'
import {getBackgroundColor} from "react-native/Libraries/LogBox/UI/LogBoxStyle";


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
        console.log(availability);
        PreferenceProfiles.addAvailability(availability)
        this.props.navigation.navigate("Remote");
    }

    ToggleSunday = () => {
        this.state.sunday ?  this.setState({ sunday: false })
            :  this.setState({ sunday: true });
    };
    ToggleMonday = () => {
        this.state.monday ?  this.setState({ monday: false })
            :  this.setState({ monday: true });

    };
    ToggleTuesday = () => {
        this.state.tuesday ?  this.setState({ tuesday: false })
            :  this.setState({ tuesday: true });

    };
    ToggleWednesday = () => {
        this.state.wednesday ?  this.setState({ wednesday: false })
            :  this.setState({ wednesday: true });

    };
    ToggleThursday = () => {
        this.state.thursday ?  this.setState({ thursday: false })
            :  this.setState({ thursday: true });

    };
    ToggleFriday = () => {
        this.state.friday ?  this.setState({ friday: false })
            :  this.setState({ friday: true });

    };
    ToggleSaturday = () => {
        this.state.saturday ?  this.setState({ saturday: false })
            :  this.setState({ saturday: true });

    };

    render() {
     
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container1}>
                    <Icon name="x" type="foundation" size={35} color="black" 
                        containerStyle={styles.iconStyle}
                        onPress={this.onPressGoToMatches}
                    />
                    <View>
                        <Text style={styles.prompt}> What days are you free?</Text>
                        <View style={styles.container2}>

                            <TouchableOpacity
                                style={this.state.sunday ? styles.dayButtonSelected : styles.dayButtonUnselected}
                                onPress={this.ToggleSunday} >
                                <Text style={this.state.sunday ? styles.dayButtonTextSelected : styles.dayButtonTextUnselected}>Sunday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={this.state.monday ? styles.dayButtonSelected : styles.dayButtonUnselected}
                                onPress={this.ToggleMonday} >
                                <Text style={this.state.monday ? styles.dayButtonTextSelected : styles.dayButtonTextUnselected}>Monday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={this.state.tuesday ? styles.dayButtonSelected : styles.dayButtonUnselected}
                                onPress={this.ToggleTuesday} >
                                <Text style={this.state.tuesday ? styles.dayButtonTextSelected : styles.dayButtonTextUnselected}>Tuesday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={this.state.wednesday ? styles.dayButtonSelected : styles.dayButtonUnselected}
                                onPress={this.ToggleWednesday} >
                                <Text style={this.state.wednesday ? styles.dayButtonTextSelected : styles.dayButtonTextUnselected}>Wednesday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={this.state.thursday ? styles.dayButtonSelected : styles.dayButtonUnselected}
                                onPress={this.ToggleThursday} >
                                <Text style={this.state.thursday ? styles.dayButtonTextSelected : styles.dayButtonTextUnselected}>Thursday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={this.state.friday ? styles.dayButtonSelected : styles.dayButtonUnselected}
                                onPress={this.ToggleFriday} >
                                <Text style={this.state.friday ? styles.dayButtonTextSelected : styles.dayButtonTextUnselected}>Friday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={this.state.saturday ? styles.dayButtonSelected : styles.dayButtonUnselected}
                                onPress={this.ToggleSaturday} >
                                <Text style={this.state.saturday ? styles.dayButtonTextSelected : styles.dayButtonTextUnselected}>Saturday</Text>
                            </TouchableOpacity>
                        </View>
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
        backgroundColor: 'white',
        justifyContent: 'space-between',
        minHeight: Math.round(Constants.windowHeight)
    },
    container2: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    iconStyle: {
        paddingTop: Constants.windowHeight * 0.05 ,
        paddingLeft: Constants.windowWidth * 0.85,
        backgroundColor: 'white',
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 999,
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
    prompt: {
        paddingTop: Constants.windowHeight * .15,
        fontSize: 36,
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
    dayButtonTextSelected: {
        fontSize:30,
        width: Constants.windowWidth * 0.50,
        textAlign: 'center',
        margin: 3,
        color: 'white',
        fontFamily: 'ProximaNova',
    },
    dayButtonTextUnselected: {
        fontSize:30,
        width: Constants.windowWidth * 0.50,
        textAlign: 'center',
        margin: 3,
        color: 'gray',
        fontFamily: 'ProximaNova',
    },
    dayButtonUnselected: {
        fontSize:30,
        width: Constants.windowWidth * 0.5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        margin: 3,
        backgroundColor: 'white',
        alignItems: 'center',

    },
    dayButtonSelected: {
        fontSize:30,
        width: Constants.windowWidth * 0.5,
        borderColor: Constants.secondaryColor,
        borderWidth: 1,
        borderRadius: 8,
        margin: 3,
        backgroundColor: Constants.secondaryColor,
        alignItems: 'center',

    },

})

export default Availibility; 