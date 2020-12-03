import React from 'react'
import {View} from 'react-native'

//For rerendering purposes
class Blank extends React.Component {

    render() {
        return(
            <View style={{flex:1, backgroundColor: 'white'}}></View>
        )
    }
}

export default Blank; 