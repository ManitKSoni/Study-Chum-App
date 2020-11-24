import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SavedData from "../../SavedData"

class UserProfile extends React.Component {

    userID = this.props.route.params.userID
    profile = SavedData.profile; 
 
    render() {
      
        return (
            <View style={styles.container}> 
                <Text> USERID: {this.userID} </Text>
                <Text style={styles.text}>{this.profile.firstName} {this.profile.lastName}</Text>
                <Text style={styles.text}>{this.profile.bio}</Text>
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