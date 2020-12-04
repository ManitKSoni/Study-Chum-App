import React from 'react'
import { View, FlatList, Text, StyleSheet, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import Firebase from '../../config/Firebase'
import ChatDataModel from './ChatDataModel'
import * as Constants from '../../Constants'


class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.onPressRow = this.onPressRow.bind(this)
        this.chatDataModel = new ChatDataModel()
        this.state = {
            buddies: [],
            loaded: false
        }
    }

    /** Will assign the buddies array state to database array */
    componentDidMount() {
        this.chatDataModel.newChatListener( (channels) => {
            this.setState({buddies: channels, loaded: true})
        })
    }

    //converts 24 hour to 12 hour format with am/pm
    convertToStandardTime(lastSentDate) {
        var convertedTime = "";
        var hour = lastSentDate.getHours();
        var minutes = lastSentDate.getMinutes();
        if (minutes < 10) { minutes = "0" + minutes; }

        if (hour === 0) {
            convertedTime = "12" + ":" + minutes + " am";
        } else if (hour === 12) {
            convertedTime = "12" + ":" + minutes + " pm";
        } else if (hour > 12) {
            hour = hour - 12;
            convertedTime = hour + ":" + minutes + " pm";
        } else {
            convertedTime = hour + ":" + minutes + " am";
        }
        return convertedTime;
    }

    /**Render the correct timestamp */
    processTimestamp(item) {
        //Set Epoch and then add offset to get time sent in UTC
        const seconds = parseInt(item.lastTimestamp.seconds);
        var lastSentDate = new Date(0);
        lastSentDate.setUTCSeconds(seconds);

        //get the current local midnight time (12:00 AM timezone)
        var currentDateMidnight = new Date();
        currentDateMidnight.setHours(0, 0, 0, 0);

        //check if time stamp is within the user's day (their 12:00 am to 11:59pm)
        var oneDay = (1 * 24 * 60 * 60 * 1000);
        const timeDifference = lastSentDate - currentDateMidnight;
        if (timeDifference >= 0 && timeDifference < oneDay) {
            return this.convertToStandardTime(lastSentDate); //returns hour:minute am/pm
        } else {
            if (lastSentDate.toLocaleDateString() === "Invalid Date") {
                return "";
            }
            return lastSentDate.toLocaleDateString(); //returns day/month/year format
        }
    }

    /** Render the correct message*/
    processMessage(item, uid) {
        var message = (item.lastSender === uid) ? "You: " : "";
        message += item.lastSentMessage;
        return message;
    }

    /** Handles an individual channel and launches a new screen passing data required **/
    onPressRow(item, uid) {
        this.props.navigation.navigate('Channel',{userData: item, uid: uid});
        this.props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });
    }

    generateImage(image) {
        if (image == null) {
            return <Image source={require('../../assets/default_pic.png')} style={styles.profileImg} />
        } else {
            return <Image source={{ uri: image }} style={styles.profileImg} />
        }
    }

    /** Function to render a specific channel/row of the flatlist **/
    renderItem(item, uid) {
        if (item.lastTimestamp == "") { return; }
        return (
            <TouchableWithoutFeedback onPress={() => this.onPressRow(item, uid)}>
                <View style={styles.row}>
                    {this.generateImage(item.userImage)}
                    <View style={styles.columnContainer}>
                        <Text style={styles.name} ellipsizeMode='tail' numberOfLines={1} > {item[uid].name} </Text>
                        <Text style={styles.messages} ellipsizeMode='tail' numberOfLines={1}>
                            {this.processMessage(item, uid)}
                        </Text>
                    </View>
                    <Text style={styles.timestamp}> {this.processTimestamp(item)} </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        const buddiesArray = Object.values(this.state.buddies)
        const uid = Firebase.auth().currentUser.uid
        if (this.state.loaded) {
            return (
                <View style = {styles.container}>
                    <FlatList
                        data={buddiesArray}
                        renderItem={({ item }) => this.renderItem(item, uid)}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}> Loading...</Text>
                    <ActivityIndicator size="large" color={Constants.secondaryColor} />
                </View>
            )}
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
        backgroundColor: 'white',
        borderBottomColor: "gray",
        borderBottomWidth: 0.7,
    },
    columnContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
    },
    profileImg: {
        width: 75,
        height: 75,
        borderRadius: 40,
        borderColor: 'gray',
        borderWidth: 2,
    },
    name: {
        fontSize: 20,
    },
    messages: {
        marginLeft: 6,
        fontSize: 12,
    },
    timestamp: {
        fontSize: 12,
        padding: 15,
    },
    images: {
        width: 75,
        height: 75,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3,
        borderRadius: 75 / 2,
        resizeMode: 'contain',
      },
      loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
      },
      loadingText: {
          fontSize: 36,
          fontFamily: "ProximaNova",
          color: Constants.secondaryColor
      },
})

export default Chat