import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SavedData from "../../SavedData"

class UserProfile extends React.Component {


    // remove back button 
    render() {
       const profile = SavedData.profile;  
        return (
            <View style={styles.container}> 
                <Text style={styles.text}>{profile.firstName} {profile.lastName}</Text>
                <Text style={styles.text}>{profile.bio}</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("ShowMatches")}>
                    <Text style={styles.text}>Go back</Text>
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

export default UserProfile