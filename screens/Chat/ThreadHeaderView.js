import React from 'react'
import {Image, View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import * as Constants from '../../Constants.js'

export default class ThreadHeaderView extends React.Component {


    render() {
        return (
        <TouchableOpacity onPress={() => this.props.onPressHeader()}>
            <View style={styles.headerView}>
                <Image
                    style={styles.profileImg}
                    source={{uri:this.props.userImage}} 
                />
                <Text style={styles.headerName}>{this.props.displayName}</Text>
            </View>

        </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    headerView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Constants.secondaryColor
    },
    profileImg: {
        width: 35,
        height: 35,
        borderRadius: 40,
        borderColor: 'gray',
        borderWidth: 2,
    },
    headerName: {
        paddingLeft: 10,
        fontSize: 24,
        color: 'white'
    }
})

