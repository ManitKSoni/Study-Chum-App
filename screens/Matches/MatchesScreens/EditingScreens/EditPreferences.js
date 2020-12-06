import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import MatchingAlgorithm from "../../Controllers/MatchingAlgorithm"
import SavedData from "../../Controllers/SavedData"
import PreferenceProfiles from "../../Controllers/PreferenceProfiles"
import * as Constants from "../../../../Constants";

class EditPreferences extends React.Component {

    state = {
        showModal: false
    }

    /** 
    constructor(props){
        super(props);
        this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
            tabBarVisible: true
        });
    }
    **/

    /**
     * Pop ups modal screen
     * @param visible - new value of state  
     */
    setModalVisible = (visible) => {
        this.setState({ showModal: visible});
    }

    /**
     * Go to ShowMatches screen refreshing the data and rerendering the screen
     */
    onPressGoToShowMatches = () => {

        this.props.navigation.navigate("Blank");
        MatchingAlgorithm.getStudentMap(SavedData.title, 
            () => this.props.navigation.navigate("ShowMatches", {name:SavedData.title}));
    }

    /**
     * Deletes preference profile from the courses and users database
     */
     deletePreferenceProfile = () => {
        PreferenceProfiles.deletePreferenceProfile(SavedData.title);
        this.setModalVisible(false); 
        this.props.navigation.navigate("Matches") 
    }

    /** 
    onPressEditAvailability = () => {
        //console.log(Constants.windowWidth);
        //this.props.navigation.navigate("Blank");
        this.props.navigation.navigate("EditAvailability");
        this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });
    } **/

    onPressEditSpecificPreference = (routeName) => {
        this.props.navigation.navigate(routeName);
        this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity
                    style = {styles.border}
                    onPress={() => this.onPressEditSpecificPreference("EditAvailability")}>
                    <Text style={styles.text}> Availability </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.border}
                    onPress={() => this.onPressEditSpecificPreference("EditQuiet")}>
                    <Text style={styles.text}> Quiet/Chatty </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.border}
                    onPress={() => this.onPressEditSpecificPreference("EditRemote")}>
                    <Text style={styles.text}> IRL/Remote</Text>
                </TouchableOpacity>
                <View style={styles.container2}>
                    <TouchableOpacity
                        style = {styles.borderDelete}
                        onPress={() => this.setModalVisible(true)}>
                        <Text style={styles.deleteButton}> Delete Class Profile </Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showModal}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}> 
                            <Text style={styles.modalQuestion}> Are you sure? </Text>

                            <View style={styles.confirmationContainer}>
                            <View style={styles.noContainer}>
                                    <TouchableOpacity onPress={() => this.setModalVisible(false)} style={styles.modalNo}> 
                                        <Text style={styles.buttonText}> No </Text>
                                    </TouchableOpacity>
                            </View>
                                <View style={styles.yesContainer}> 
                                <TouchableOpacity style={styles.modalYes} onPress={this.deletePreferenceProfile}>
                                    <Text style={styles.buttonText}> Yes </Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                </Modal>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
        paddingBottom:20,
        backgroundColor: 'white',
    },
    container2: {
        //backgroundColor: '#fff',
        alignItems: 'center',
        paddingBottom: 15,
        bottom: 0,
        position: 'absolute',
        width: '100%'
    },
    text: {
        fontSize: Constants.windowHeight * 0.04,
        color: 'grey',
        paddingVertical: 7,
        paddingLeft: 4,
        fontFamily: "ProximaNova"

    },
    deleteButton: {
        fontSize: Constants.windowHeight * 0.035,
        color: 'red',
        margin: 5,
        fontFamily: "ProximaNova"
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginLeft: Constants.windowWidth * .025,
        width: '95%',
    },
    borderDelete: {
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        borderTopWidth: 1,
        borderTopColor: 'red',
        margin: 6,
    },
    modalView: {
        margin: 20,
        width: Constants.windowWidth * 0.7,
        height: Constants.windowHeight * 0.155,
        backgroundColor: "white",
        borderRadius: 22,
        padding: 35,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        
    },
    modalQuestion: {
        fontSize: Constants.windowHeight * 0.033,
        fontFamily: "ProximaNova"
    },
    modalYes: {
        justifyContent: "flex-end",
        backgroundColor: Constants.primaryColor,
        borderRadius: 60,
        width: 80,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    modalNo: {
        justifyContent: "flex-start",
        backgroundColor: '#CAD5CA',
        borderRadius: 60,
        width: 80,
        height: 40,
        alignItems: "center",
        justifyContent:"center"
    },
    confirmationContainer: {
        flexDirection:"row",
        paddingTop: 10
    }, 
    buttonText: {
        color:"white",
        fontSize:Constants.windowHeight * 0.031,
        fontFamily:"ProximaNova"
    },
    yesContainer: {
        paddingLeft:20
    },
    noContainer: {
        paddingRight: 20
    }

})

export default EditPreferences; 