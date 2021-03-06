import React from 'react'

import {Text,View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from 'react-native'
import * as Constants from '../../../../Constants.js'

class Matches extends React.Component{

    constructor() {
        super();
        this.state = {img: <Image style={{
        width: Constants.windowWidth * .8,
        height: Constants.windowWidth * .8,
        resizeMode: 'contain',
        //transform: [{rotate: `${this.tiltAngle()}deg`}]
        }} source={require('../../../../assets/study_chums_logo.png')} />}
        this.onButtonPress = this.onButtonPress.bind(this)
        this.tiltAngle = this.tiltAngle.bind(this)
    }
    tiltAngle() {
        let tilt = Math.random() * 180
        return Math.random() < .5 ? -1 * tilt : tilt
    }
    onButtonPress = () => {
        var ang = this.tiltAngle();
        this.setState({
            img: <Image style={{
            width: Constants.windowWidth * .8,
            height: Constants.windowWidth * .8,
                resizeMode: 'contain', transform: [{rotate: `${ang}deg`}]
            }} source={require('../../../../assets/study_chums_logo.png')} />
        });
    }

    render() {

       return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                 <View style={styles.container}>
                     <TouchableOpacity onPress={this.onButtonPress}>
                         <View style>
                             {this.state.img}
                         </View>
                     </TouchableOpacity>
                     <Text style={styles.text}>Press the top left icon to add a class and find a chum!</Text>
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
    text: {
        width: '70%',
        fontSize: Constants.windowHeight / 40,
        paddingTop: 50,
        textAlign: 'center',
        color: 'grey',
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'left'
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
    }
})
export default Matches