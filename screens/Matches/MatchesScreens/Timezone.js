import React from 'react'
import { View, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import {TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'
import PreferenceProfiles from "../PreferenceProfiles"


class Timezone extends React.Component {
    
    state = {
        timezone: ""
    }


    onPressGoToMatches = () => {
        this.props.navigation.navigate("Matches");
    }

    onPressGoToTimeOfDay = () => {
        PreferenceProfiles.addTimezone(this.state.timezone);
        this.props.navigation.navigate("TimeOfDay");
    }

    render() {
        return(
            <View style={styles.container}>
            {/* <TextInput
                style={styles.inputBox}
                value={this.state.timezone}                    
                onChangeText={timezone => this.setState({ timezone })}
                placeholder='Timezone'
            /> */}

            <Picker
            selectedValue={this.state.timezone}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
                this.setState({timezone: itemValue})
            }>
            <Picker.Item label="EST" value="EST" />
            <Picker.Item label="PST" value="PST" />
            </Picker>

            <Button title="Submit" onPress={this.onPressGoToTimeOfDay}/>
            <Button title="Cancel" onPress={this.onPressGoToMatches}/>
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

export default Timezone; 