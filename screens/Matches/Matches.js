import React from 'react'
import { View, Text } from 'react-native'
import Firebase from '../../config/Firebase'
import instance from '../Singletons/UserSingleton'

class Matches extends React.Component{
    
    render() {
        return (
            <View>
                <Text>
                    {instance._user}
                </Text>
            </View>
        )
    }
}

export default Matches