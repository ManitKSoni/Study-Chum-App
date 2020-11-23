import React from 'react'
import { View, Text, TouchableOpacity} from 'react-native';
import SavedData from "../SavedData"

class UserProfile extends React.Component {


    // remove back button 
    render() {
       const profile = SavedData.profile;  
        return (
            <View> 
                <Text>{profile.firstName} {profile.lastName}</Text>
                <Text>{profile.bio}</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("ShowMatches")}>
                    <Text>Go back</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default UserProfile