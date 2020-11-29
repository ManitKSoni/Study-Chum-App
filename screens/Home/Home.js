 
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Button, Alert, Modal, TextInput } from 'react-native';
import * as Constants from '../../Constants.js';
import {Agenda} from 'react-native-calendars';
import Firebase from '../../config/Firebase';
 
class Home extends React.Component {

    db = Firebase.firestore();
    userID = Firebase.auth().currentUser.uid;
    unsubscribe; // used to stop checking firestore for updates

    constructor(props) {
        super(props);
        this.unsubscribe = this.db.collection("users").doc(this.userID).onSnapshot(
            doc => {
                this.setState({
                    items: doc.data().events
                })
            }
        );
        this.state = {
            img: <Image style={{
                width: Constants.windowHeight * .35,
                height: Constants.windowHeight * .35,
                resizeMode: 'contain'
            }} source={require('../../assets/study_chums_logo.png')} ></Image>,
            // currently filled with test events.
            // would be populated with events from the database in the future
            /** 
            items: {
                '2020-11-22': [{name: 'Study session with Dylan',time: '9:00 AM'},{name: 'Study session with Edward',time: '5:00 PM'}],
                '2020-11-23': [{name: 'Study session with Julio',time: '2:00 PM'}],
                '2020-11-24': [{name: 'Study session with Jessica',time: '12:00 PM'},{name: 'Study session with Bruno',time: '4:00 PM'}],
                '2020-11-25': [{name: 'Study session with Mary',time: '10:00 PM'}],
                '2020-11-26': [{name: 'Study session with John',time: '10:00 AM'}],
                '2020-11-28': [{name: 'Study session with Spicoli',time: '4:20 PM'},{name: 'Study session with Chicken Joe',time: '5:00 PM'}],
                '2020-12-03': [{name: 'Study session with Kendall',time: '5:00 PM'}],
              },
              */
            items: {},
            // tells wether the add event pop-up is shown
            show: false,
            // event creation input
            month: '',
            day: '',
            year: '',
            name: '',
            time: '',
        };
    }

    /** Called on Settings screen being rendered */
    componentDidMount() {
        this.fetchUserDetails();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
 
    render() {
        return (
            <View style={styles.container}>
                    <View style>
                        {this.state.img}
                        <Agenda style={styles.calendar}
                            items={this.state.items}
                            loadItemsForMonth={this.loadItems.bind(this)}
                            renderItem={this.renderItem.bind(this)}
                            rowHasChanged={this.rowHasChanged.bind(this)} 
                            selected={ this.getTodaysDate }
                            theme={{
                            calendarBackground: '#ffffff',
                            selectedDayBackgroundColor: '#8075FF',
                            selectedDayTextColor: '#FFFFFF',
                            todayTextColor: '#8075FF',
                            dotColor: '#8075FF',
                            agendaKnobColor: '#000000',
                            monthTextColor: '#8075FF',
                            agendaTodayColor: '#8075FF',
                            }}
                        />
                        <Modal
                          animationType="slide"
                          transparent={true}
                          visible={this.state.show}
                          onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                          }}
                        >
                            <View style = {styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={{paddingBottom: 10}}>
                                        Event Description
                                    </Text>
                                    <TextInput 
                                        style={{height: 20}}
                                        placeholder="Type an event description"
                                        onChangeText={name => this.setState({ name })}
                                    />
                                    <View style={styles.dateSelection} >
                                        <Text style={{paddingRight:40}}>
                                            Month:
                                        </Text>
                                        <TextInput  
                                        style={{height: 20,}}
                                        keyboardType = 'numeric'
                                        maxLength = {2}
                                        placeholder="MM"
                                        onChangeText={month => this.setState({ month })}
                                        />
                                    </View>
                                    <View style={styles.dateSelection}>
                                        <Text style={{paddingRight:40}}>
                                            Day: 
                                        </Text>
                                        <TextInput 
                                        style={{height: 20,}}
                                        keyboardType = 'numeric'
                                        maxLength = {2}
                                        placeholder="DD"
                                        onChangeText={day => this.setState({ day })}
                                        />
                                    </View>
                                    <View style={styles.dateSelection}>
                                        <Text style={{paddingRight:40}}>
                                            Year: 
                                        </Text>
                                        <TextInput 
                                        style={{height: 20,}}
                                        keyboardType = 'numeric'
                                        maxLength = {4}
                                        placeholder="YYYY"
                                        onChangeText={year => this.setState({ year })}
                                        />
                                    </View>
                                    <View style={styles.dateSelection}>
                                        <Text style={{paddingRight:40}}>
                                            Time: 
                                        </Text>
                                        <TextInput 
                                        style={{height: 20,}}
                                        placeholder="00:00"
                                        onChangeText={time => this.setState({ time })}
                                        />
                                    </View>
                                    <View style={{flexDirection:"row"}}>
                                        <Button style={{justifyContent: 'flex-start',}}
                                            color='#8075FF'
                                            title="Cancel"
                                            onPress={() => this.setModalVisible(false)}
                                        />
                                        <Button tyle={{justifyContent: 'flex-end',}}
                                            color='#8075FF'
                                            title="Add Event"
                                            onPress={this.onPressAdd.bind(this)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <Button
                        onPress={() => this.setModalVisible(true)}
                        title='Add an Event'
                        color='#8075FF'
                    />
                    </View>
                    
            </View>
        );
    }

    // modifies the visibility of the add event pop-up
    setModalVisible = (visible) => {
        this.setState({ show: visible});
    }

    // handles the addition of events
    onPressAdd() {
        var date = this.state.year + '-' + this.state.month + '-' + this.state.day;
        this.setModalVisible(false);
    }

    /** Gets the initial user details */
    getUserDetails() {
        var userID = Firebase.auth().currentUser.uid;
        return this.db.collection("users")
            .doc(userID)
            .get()
            .then(function(doc) {
                return doc.data()
            })
            .catch(function(error) {
                console.log('Error getting user details: ', error)
            })
    }

    /** Initializes state variables based on the firestore data */
    fetchUserDetails = async () => {
        try {
            const userDetails = await this.getUserDetails()
            this.setState({
                items: userDetails.events
            })
        } catch (error) {
            console.log(error)
        }
    }

    // returns the current date in yyyy-mm-dd format
    getTodaysDate = () => {
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var day = new Date().getDate();
        var formattedDate = year + "-" + month + "-" + day;
        return (formattedDate);
    }

    // loads the day items to be displayed on the agenda 
    loadItems(day) {
        setTimeout(() => {
          for (let i = -15; i < 60; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(time);
            if (!this.state.items[strTime]) {
              this.state.items[strTime] = [];
            }
          }
          const newItems = {};
          Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
          this.setState({
            items: newItems
          });
        }, 1000);
      }

      // displays the description and time of an event item
      renderItem(item) {
        return (
          <TouchableOpacity
            onPress={() => Alert.alert(item.name, item.time)}
          >
            <Text style={styles.text}>{item.name + '\n'}{item.time}</Text>
          </TouchableOpacity>
        );
      }

      timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
      }

      rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
      }

}
 
const styles = StyleSheet.create({
    container: {
        width:Constants.windowWidth,
        paddingTop:50,
        paddingBottom: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',  
    },
    calendar: {
        flex: 1,
        height: Constants.windowHeight * .4,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        width: Constants.windowWidth * 0.7,
        height: 300,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    text: {
        fontSize:12,
        paddingTop:40,
        paddingRight:10,
        textAlign:'left'
    },
    dateSelection: {
        flexDirection:"row", 
        justifyContent: "center", 
        alignItems: "center",
        padding: 10
    }
});
 
 
export default Home