import React from 'react'

import { View, Text } from 'react-native'

import {Switch, StyleSheet, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'
import PreferenceProfiles from "../PreferenceProfiles"


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

    onPressGoToQuiet = () => {
        var availability = this.createAvailabilityMap();
        PreferenceProfiles.addAvailability(availability)
        this.props.navigation.navigate("Quiet");
    }

    render() {
     
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
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
                <Button title="Submit" onPress={this.onPressGoToQuiet}/>
                <Button title="Cancel" onPress={this.onPressGoToMatches}/>
               
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

export default Availibility; 