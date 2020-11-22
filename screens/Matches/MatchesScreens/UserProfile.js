import React from 'react'
import { View, Text} from 'react-native';
import SavedData from "../SavedData"

class UserProfile extends React.Component {

    render() {
       const profile = SavedData.profile;  
        return (
            <View> 
                <Text>{profile.firstName} {profile.lastName}</Text>
                <Text>{profile.bio}</Text>
            </View>
        )
    }

}

export default UserProfile