import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Firebase from '../../../../config/Firebase'
import SavedData from "../../SavedData"
import ChatDataModel from "../../../Chat/ChatDataModel"


class UserProfile extends React.Component {

        userID = this.props.route.params.userID
        profile = SavedData.profile; 
        chatDataModel = new ChatDataModel()


    goToChannel() {
        this.chatDataModel.getChannel(this.userID, `${this.profile.firstName} ${this.profile.lastName}`, (channelID) => {
            this.props.navigation.navigate("ChatChannel", {
                userData: {
                    channelID: channelID
                },
                uid: Firebase.auth().currentUser.uid,
                title: `${this.profile.firstName} ${this.profile.lastName}`
            });
        })
    }

    render() {
      
        return (
            <View style={styles.container}> 
                <Text> USERID: {this.userID} </Text>
                <Text style={styles.text}>{this.profile.firstName} {this.profile.lastName}</Text>
                <Text style={styles.text}>{this.profile.bio}</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("ShowMatches")}>
                    <Text style={styles.text}>Go back</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {this.goToChannel()}}>
                    <Text style={styles.text}>Chat</Text>
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