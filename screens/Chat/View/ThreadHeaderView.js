import React from 'react'
import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import * as Constants from '../../../Constants.js'

export default class ThreadHeaderView extends React.Component {


    generateImage(image) {
        if (image == null) {
            return <Image source={require('../../../assets/default_pic_gray.png')} style={styles.profileImg} />
        } else {
            return <Image source={{ uri: image }} style={styles.profileImg} />
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.headerView} onPress={() => this.props.onPressHeader()}>
                {this.generateImage(this.props.userImage)}
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.headerName}>{this.props.displayName}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    headerView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Constants.secondaryColor,
    },
    profileImg: {
        width: Constants.windowWidth * 0.1,
        height: Constants.windowHeight * 0.05,
        borderRadius: Constants.windowWidth * 0.1,
        borderColor: 'gray',
        borderWidth: 2,
    },
    headerName: {
        paddingLeft: 10,
        fontSize: Constants.windowHeight * 0.034,
        color: 'white'
    }
})

