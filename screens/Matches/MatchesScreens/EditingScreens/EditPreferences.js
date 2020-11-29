import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MatchingAlgorithm from "../../MatchingAlgorithm"
import SavedData from "../../SavedData"
import PreferenceProfiles from "../../PreferenceProfiles"
import * as Constants from "../../../../Constants";

class EditPreferences extends React.Component {

    /**
     * Go to ShowMatches screen refreshing the data and rerendering the screen
     */
    onPressGoToShowMatches = () => {

        this.props.navigation.navigate("Blank");
        MatchingAlgorithm.getStudentMap(SavedData.title, 
            () => this.props.navigation.navigate("ShowMatches", {name:SavedData.title}));
    }

    /**
     * Deletes preference profile from the courses and users database
     */
     deletePreferenceProfile = () => {
        PreferenceProfiles.deletePreferenceProfile(SavedData.title);
        this.props.navigation.navigate("Matches") 
    }

    onPressEditAvailability = () => {
        this.props.navigation.navigate("Blank");
        this.props.navigation.navigate("EditAvailability");
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity
                    style = {styles.border}
                    onPress={this.onPressEditAvailability}>
                    <Text style={styles.text}> Availability </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.border}
                    onPress={() => this.props.navigation.navigate("EditQuiet")}>
                    <Text style={styles.text}> Quiet/Chatty </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.border}
                    onPress={() => this.props.navigation.navigate("EditRemote")}>
                    <Text style={styles.text}> IRL/Remote</Text>
                </TouchableOpacity>
                <View style={styles.container2}>
                    <TouchableOpacity
                        style = {styles.borderDelete}
                        onPress={this.deletePreferenceProfile}>
                        <Text style={styles.deleteButton}> Delete Class Profile </Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
        paddingBottom:20,
    },
    container2: {
        //backgroundColor: '#fff',
        alignItems: 'center',
        paddingBottom: 15,
        bottom: 0,
        position: 'absolute',
        width: '100%'
    },
    text: {
        fontSize: Constants.windowHeight * 0.04,
        color: 'grey',
        paddingVertical: 7,
        paddingLeft: 4,

    },
    deleteButton: {
        fontSize: Constants.windowHeight * 0.035,
        color: 'grey',
        margin: 5,
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginLeft: Constants.windowWidth * .025,
        width: '95%',
    },
    borderDelete: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        borderTopWidth: 1,
        borderTopColor: 'gray',
        margin: 6,
    }

})

export default EditPreferences; 