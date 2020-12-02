import React from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator} from 'react-native'
import SavedData from "../../Controllers/SavedData"
import * as Constants from '../../../../Constants.js'
import {createMatchesData} from "../../Controllers/CreateData"

class ShowMatches extends React.Component {

    state = {
        data: [],
        loaded: false,
    }

    constructor(props) {
        super(props);
    }

    /**
     * Retrieves all data of users from the PQ from MatchingAlgorithm.js
     */
    async componentDidMount() {
        var data = await createMatchesData();
        var dupeMap = new Map(); 
        var trueData = [];
        for(let i = 0; i < data.length; i++) {
            if(!dupeMap.has(data[i].userID)) {
                dupeMap.set(data[i].userID, true);
                trueData.push(data[i]);
            }
        }
        this.setState({data: trueData})
        this.setState({loaded:true})
    }
    
    /**
     * Go to pressed user's profile
     * @param uid - The pressed users UID to retrieve their info in SavedData 
     */
    onPressGoToUserProfile = (uid, uri) => {
        SavedData.renderProfile(uid, () => 
            this.props.navigation.navigate("UserProfile", {userID: uid, URI: uri}));
        console.log(uid)
    }
   
    render() {
        const renderItem = ({item}) => ( 
            <Item name = {item.name} 
                bio = {item.bio} 
                endorsements = {item.endorsements}
                URI = {item.uri} 
                tally = {item.tally}
                onPress = {() => this.onPressGoToUserProfile(item.userID, item.uri)}
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
const Item = ({ name, bio, onPress, URI, tally }) => {
    

    if(URI) {
        return(
            <TouchableOpacity style={styles.item} onPress={onPress}>
                <View style={styles.itemRow}> 
                    <View style={styles.itemColumn}> 
                        <Image source={{uri:URI}} style={styles.images}/> 
                    </View>
            
            
                    <View>
                        <View style = {styles.centerText}> 
                            <Text style={styles.name}>  
                                {name} {"\n"} 
                                <Text style={styles.bio}>
                                    {((bio).length > (Constants.windowWidth/10)) ?
                                    (((bio).substring(0,(Constants.windowWidth/10)-3)) + '...') :
                                    bio}
                                </Text>
            
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.tally}> {tally}  </Text>
                </View>
            </TouchableOpacity>
        )
    } else {
        return(
            <TouchableOpacity style={styles.item} onPress={onPress}>
                <View style={styles.itemRow}> 
                    <View style={styles.itemColumn}> 
                        <Image source={require('../../../../assets/default_pic.png')} style={styles.images}/> 
                    </View>
            
            
                    <View>
                        <View style = {styles.centerText}> 
                            <Text style={styles.name}>  
                                {name} {"\n"} 
                                <Text style={styles.bio}>
                                    {((bio).length > (Constants.windowWidth/10)) ?
                                    (((bio).substring(0,(Constants.windowWidth/10)-3)) + '...') :
                                    bio}
                                </Text>
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.tally}> {tally}  </Text>
                </View>
            </TouchableOpacity>
        )
    }
}
                            

const styles = StyleSheet.create({
    container: {
        paddingTop:.5,
    },
    item: {
        borderColor: 'grey',
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
        width: 65,
        height: 65,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 5,
        borderRadius:65/2,
        marginVertical: 5,
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