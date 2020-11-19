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

    /**Render the correct timestamp */
    processTimestamp(item) {
        const secondsString = item.lastTimestamp.seconds;
        const seconds = parseInt(secondsString);
        var lastSentDate = new Date(0); //sets to epoch
        lastSentDate.setUTCSeconds(seconds); // Gets todays date by adding Epoch + seconds since then
        const todaysDate = new Date().getTime(); //Convert current date to seconds for comparison
        const oneDay = (1 * 24 * 60 * 60 * 1000); //one day in seconds (86,400 seconds)
        console.log(todaysDate - lastSentDate);
        const lessThanOneDay = (todaysDate - lastSentDate) <= oneDay ? true : false;

        // The yourDate time is less than 1 days from now
        if (lessThanOneDay === true) {
            //var localDate = lastSentDate.toLocaleString('en-US');
            var hour = lastSentDate.getHours();
            var minutes = lastSentDate.getMinutes();
            var hourMinuteDate = "";
            if (hour >= 12) {
                hour -= 12;
                hourMinuteDate = hour + ":" + minutes + " pm";
            } else if (hour == 0) {
                hour = 12;
                hourMinuteDate = hour + ":" + minutes + " am";
            } else {
                hourMinuteDate = hour + ":" + minutes + " am";
            }
            return hourMinuteDate;
        } else {
            return lastSentDate.toLocaleDateString();
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
                <View style={styles.container}>
                    <Image style={styles.profileImg} source={require('../../assets/study_chums_logo.png')} />
                    <View style={styles.columnContainer}>
                        <Text style={styles.name}> {item[uid].name} </Text>
                        <Text style={styles.message}> {this.processMessage(item, uid)} </Text>
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
            <View style={styles.container}>
                <FlatList
                    data={buddiesArray}
                    renderItem={({ item }) => this.renderItem(item, uid)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
        backgroundColor: 'white',
        borderBottomColor: "gray",
        borderBottomWidth: 0.7
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
        fontSize: 15,
    },
    timestamp: {
        fontSize: 12,
        padding: 15,
    }
})

export default Chat