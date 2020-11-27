import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MatchingAlgorithm from "../../MatchingAlgorithm"
import SavedData from "../../SavedData"
import PreferenceProfiles from "../../PreferenceProfiles"

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

    render() {
        return (
            <View style={styles.container}> 
                <Text> {SavedData.title} </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("EditAvailability")}>
                    <Text style={styles.text}> Edit Availability </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("EditQuiet")}>
                    <Text style={styles.text}> Loud/Quiet </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("EditRemote")}>
                    <Text style={styles.text}>Edit In person/Remote</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPressGoToShowMatches}>
                    <Text style={styles.text}>Go back to matches</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.deletePreferenceProfile}>
                    <Text style={styles.deleteButton}> Delete Class Profile </Text>
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
        paddingBottom:20
    }, 
    text: {
        fontSize: 24
    },
    deleteButton: {
        fontSize: 24,
        color: 'grey'
    },

})

export default EditPreferences; 