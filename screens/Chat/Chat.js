import React from 'react'
import { View, FlatList, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import Firebase from '../../config/Firebase'

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.onPressRow = this.onPressRow.bind(this)
        this.state = {
            buddies: []
        }
    }

    /** Will assign the buddies array state to database array */
    async componentWillMount() {
        let db = Firebase.firestore()
        let snapshot = await db.collection('chat').get()
        data = snapshot.docs.map(doc => doc.data())
        this.setState({ buddies: data })
        console.log(data);
    }

    //converts 24 hour to 12 hour format with am/pm
    convertToStandardTime(lastSentDate) {
        var convertedTime = "";
        var hour = lastSentDate.getHours();
        var minutes = lastSentDate.getMinutes();
        if (minutes === 0) { minutes = "00"; }

        if (hour === 0) {
            convertedTime = "12" + ":" + minutes + " am";
        } else if (hour === 12) {
            convertedTime = "12" + ":" + minutes + " pm";
        } else if (hour > 12) {
            hour = hour - 12;
            convertedTime = hour + ":" + minutes + " am";
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
        this.props.navigation.navigate("Channel", {
            userData: item,
            uid: uid,
        });
    }

    /** Function to render a specific channel/row of the flatlist **/
    renderItem(item, uid) {
        return (
            <TouchableWithoutFeedback onPress={() => this.onPressRow(item, uid)}>
                <View style={styles.row}>
                    <Image style={styles.profileImg} source={require('../../assets/study_chums_logo.png')} />
                    <View style={styles.columnContainer}>
                        <Text style={styles.name}> {item[uid].name} </Text>
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
        return (
            <View style = {styles.container}>
                <FlatList
                    data={buddiesArray}
                    renderItem={({ item }) => this.renderItem(item, uid)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container :{
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
        borderBottomWidth: 0.5
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
    }
})

export default Chat