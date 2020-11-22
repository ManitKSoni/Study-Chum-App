import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import * as Constants from '../../Constants.js'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: <Image style={{
                width: Constants.windowWidth * .8,
                height: Constants.windowWidth * .8,
                resizeMode: 'contain', transform: [{ rotate: `${this.tiltAngle()}deg` }]
            }} source={require('../../assets/study_chums_logo.png')} ></Image>
        }
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
                resizeMode: 'contain', transform: [{ rotate: `${ang}deg` }]
            }} source={require('../../assets/study_chums_logo.png')} ></Image>
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onButtonPress}>
                    <View style>
                        {this.state.img}
                    </View>
                </TouchableOpacity>
            </View>
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
});


export default Home