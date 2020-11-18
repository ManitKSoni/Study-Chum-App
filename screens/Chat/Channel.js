import React from 'react'
import { View, Text } from 'react-native'

class Channel extends React.Component {

    render() {
        const { userData, uid } = this.props.route.params;
        return (
            <View>
                <Text>Hello! {userData[uid].name}</Text>
            </View>
        )
    }
}

export default Channel