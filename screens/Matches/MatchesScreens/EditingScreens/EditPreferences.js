import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MatchingAlgorithm from "../../MatchingAlgorithm"
import SavedData from "../../SavedData"

class EditPreferences extends React.Component {

    onPressGoToShowMatches = () => {
        this.props.navigation.navigate("Blank");
        MatchingAlgorithm.getStudentMap(SavedData.title, 
            () => this.props.navigation.navigate("ShowMatches"));
    }

    render() {
        return (
            <View style={styles.container}> 
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("EditAvailability")}>
                    <Text style={styles.text}> Edit Availability </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.text}> Loud/Quiet </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.text}>Edit In person/Remote</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPressGoToShowMatches}>
                    <Text style={styles.text}>Go back to matches</Text>
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
    }

})

export default EditPreferences; 