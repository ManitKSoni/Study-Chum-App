import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity, Image} from 'react-native'
import MatchingAlgorithm from "../../MatchingAlgorithm"
import SavedData from "../../SavedData"
import * as Constants from '../../../../Constants.js'
import Firebase from '../../../../config/Firebase';

class ShowMatches extends React.Component {

   async createData() {
        var pq = MatchingAlgorithm.queue;
        var data = []
        var count = 0;
        while (pq.length != 0) {
            var currStudent = pq.dequeue();
            var URI = await this.getImage(currStudent.userID)
            var currData = {
                id: count.toString(),
                userID: currStudent.userID, //use to go to user profile
                name: currStudent.student.name,
                bio: currStudent.student.bio,
                endorsements: currStudent.student.endorsements,
                uri: URI,
                tally: currStudent.tally
            };
            count++;
            data.push(currData);
        }
      
        return data; 
    };

    state = {
        data: [],
        loaded: false
    }
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        var data = await this.createData();
        this.setState({data: data})
        this.setState({loaded:true})
    }

    async getImages(data) {
        var images = new Map(); 
        for(var i = 0; i < data.length; i++) {
            var imageURI = await this.getImage(data[i].userID);
            var x = {image: imageURI}
            images.set(data[i].userID, x);
        }
        this.setState({images, images})
    }

    
    onPressGoToUserProfile = (uid) => {
        SavedData.renderProfile(uid, ()=>this.props.navigation.navigate("UserProfile", {userID: uid}));
        console.log(uid)
    }

    async getImage(userID) {

        var storage = Firebase.storage();
        var imagePath = storage.ref('images/' + userID);
        var imageURI = null
        try{
            imageURI = await imagePath.getDownloadURL(); 
    
        } catch(err) {
          console.log("No image on database")
          imageURI = null;
        }
    
        return imageURI; 
    }
   
    render() {
        const renderItem = ({item}) => ( 
            <Item name = {item.name} 
                bio = {item.bio} 
                endorsements = {item.endorsements}
                URI = {item.uri} 
                tally = {item.tally}
                onPress = {() => this.onPressGoToUserProfile(item.userID)}
            />
        );

        if(this.state.loaded) {
            if(this.state.data.length!=0){
                return (
                    <View style={styles.container}>
                        <FlatList
                            data={this.state.data}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Matches")}>
                            <Text> Go Back To Matches Screen </Text>
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>No matches found. :(</Text>
                    </View>
                )
            }
        } else {
            return (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}> Loading...</Text>
                </View>
            )
        }
    }
}

const Item = ({ name, bio, endorsements, onPress, URI, tally }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.name}> {name} </Text>
        <Text style={styles.text}> {bio}  </Text>
        <Text style={styles.tally}> {tally}  </Text>
        <Image source={{uri:URI}} style={styles.images}/>
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
    tally: {
        fontSize: 25,
        fontFamily: "ProximaNova"
    },
    header: {
        fontSize: 36,
        fontFamily: "ProximaNova",
        textAlign: "center"

    },
    images: {
        width: 30,
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3,
      },
      loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      loadingText: {
          fontSize: 36,
          fontFamily: "ProximaNova",
          color: Constants.secondaryColor
      }
});

export default ShowMatches; 