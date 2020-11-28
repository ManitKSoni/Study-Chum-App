import React from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator} from 'react-native'
import MatchingAlgorithm from "../../MatchingAlgorithm"
import SavedData from "../../SavedData"
import * as Constants from '../../../../Constants.js'
import Firebase from '../../../../config/Firebase';

class ShowMatches extends React.Component {

    /**
     * Gets all data from PQ from MatchingAlgorithm for each user in courses 
     * database
     */
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
                tally: currStudent.tally,
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

    /**
     * Retrieves all data of users from the PQ from MatchingAlgorithm.js
     */
    async componentDidMount() {
        var data = await this.createData();
        this.setState({data: data})
        this.setState({loaded:true})
    }
    
    /**
     * Go to pressed user's profile
     * @param uid - The pressed users UID to retrieve their info in SavedData 
     */
    onPressGoToUserProfile = (uid) => {
        SavedData.renderProfile(uid, () => 
            this.props.navigation.navigate("UserProfile", {userID: uid}));
        console.log(uid)
    }

    /**
     * Retrieves image of users in current course's database
     * @param userID - The image ID to retrieve from firebase storage
     */
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
                onPress = {() => this.onPressGoToUserProfile(item.userID, item.preferences)}
            />
        );
        
        //Show Matches once all users' data is retrieved
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
            // Show spinner when loading matches
            return (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}> Matching...</Text>
                    <ActivityIndicator size="large" color={Constants.secondaryColor} />
                </View>
            )
        }
    }
}

/**
 * Each slot of flatlist that is linked to a user
 */
const Item = ({ name, bio, endorsements, onPress, URI, tally }) => (
    /*<TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.name}>  
            <Image source={{uri:URI}} style={styles.images}/> 
            {name} {"\n"} 
            <Text style={styles.text}> {bio}  </Text>
        
         </Text>
       
        <Text style={styles.tally}> {tally}  </Text>
      
    </TouchableOpacity>*/

    <TouchableOpacity style={styles.item} onPress={onPress}>
        <View style={styles.itemRow}> 
            <View style={styles.itemColumn}> 
                <Image source={{uri:URI}} style={styles.images}/> 
            </View>
       
      
            <View>
                <View style = {styles.centerText}> 
                    <Text style={styles.name}>  
                        {name} {"\n"} 
                        <Text style={styles.bio}> {bio}  </Text>
                        {/*<Text style={styles.tally}> {tally}  </Text>*/}
                    </Text>
                </View>
            </View>
        </View>
       
    
      
    </TouchableOpacity>

)

const styles = StyleSheet.create({
    container: {
        paddingTop:.5
    },
    item: {
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal:.15,
        height:80,
        width: Constants.windowWidth,
        paddingTop:2,
    },

    name: {
        fontSize: 24,
        fontFamily: "ProximaNova"
    },
    bio: {
        fontSize: 16,
        fontFamily: "ProximaNova",
        color: 'grey'
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
        width: 75,
        height: 75,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3,
        width: 75,
        height: 75,
        borderRadius:75/2,
        resizeMode: 'contain',
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
      },
      itemColumn: {
        flexDirection: 'column',
        width: '22%',
      },
      itemRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      centerText: {
        paddingTop: 15,
      },
});

export default ShowMatches; 