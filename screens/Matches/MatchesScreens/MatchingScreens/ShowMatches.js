import React from 'react'
import {View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity} from 'react-native'
import MatchingAlgorithm from "../../MatchingAlgorithm"
import SavedData from "../../SavedData"
import * as Constants from '../../../../Constants.js'


class ShowMatches extends React.Component {

   data = this.createData()

    createData() {
        var pq = MatchingAlgorithm.queue;
        var data = []
        var count = 0;
        while (pq.length != 0) {
            var currStudent = pq.dequeue();
            var currData = {
                id: count.toString(),
                userID: currStudent.userID, //use to go to user profile
                name: currStudent.student.name,
                bio: currStudent.student.bio,
                endorsements: currStudent.student.endorsements
            };
            count++;
            data.push(currData);
        }

      
        return data; 
    };
    
    onPressGoToUserProfile = (uid) => {
        SavedData.renderProfile(uid, ()=>this.props.navigation.navigate("UserProfile"));
    }

   
    render() {
        
        const renderItem = ({item}) => (
        
            <Item name = {item.name} 
                bio = {item.bio} 
                endorsements = {item.endorsements}
                onPress = {() => this.onPressGoToUserProfile(item.userID)}
            />
        );

       // this.props.navigation.setOptions({ title: SavedData.title })
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Matches")}>
                    <Text> Go Back To Matches Screen </Text>
                </TouchableOpacity>
            </View>
        )
        
    }
}

const Item = ({ name, bio, endorsements, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.name}> {name} </Text>
        <Text style={styles.text}> {bio}  </Text>
    </TouchableOpacity>

)

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //marginTop: StatusBar.currentHeight || 0,
        paddingTop:.5
    },
    item: {
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal:.15,
        height:50,
        width: Constants.windowWidth 
    },

    name: {
        fontSize: 20,
        fontFamily: "ProximaNova"
    },
    bio: {
        fontSize: 16,
        fontFamily: "ProximaNova"
    },
    header: {
        fontSize: 36,
        fontFamily: "ProximaNova",
        textAlign: "center"

    }
});

export default ShowMatches; 