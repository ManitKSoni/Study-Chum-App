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
                            <Text style={styles.subtext}> {item[uid].picture} </Text>
                        </View>
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
    subtext: {
        fontSize: 15,
    },
})

export default Chat