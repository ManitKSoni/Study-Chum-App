 
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Button, Alert, Modal, TextInput } from 'react-native';
import * as Constants from '../../Constants.js';
import {Agenda} from 'react-native-calendars';
import Firebase from '../../config/Firebase';
import KeyboardSpacer from 'react-native-keyboard-spacer';
 
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
                width: Constants.windowHeight * .40,
                height: Constants.windowHeight * .17,
                resizeMode: 'contain'
            }} source={require('../../assets/study_chums_title.png')} ></Image>,
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
                                    <View style={{flexDirection:"row", paddingTop: Constants.windowWidth * 0.02}}>
                                        <View style={{paddingRight: Constants.windowWidth * 0.05}}>
                                        <TouchableOpacity style={{borderRadius:10, backgroundColor: "#8075FF", paddingHorizontal: Constants.windowWidth * 0.03}}
                                            onPress={() => this.setModalVisible(false)}>
                                            <Text style={styles.cancel}>
                                                Cancel     
                                            </Text>
                                        </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={{borderRadius:10, backgroundColor: "#8075FF",}}
                                            onPress={this.onPressAdd.bind(this)}>
                                            <Text style={styles.addEvent}>
                                                Add Event
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <KeyboardSpacer/>
                        </Modal>
                        <View style={{paddingTop:Constants.windowHeight * 0.02}}>
                            <TouchableOpacity style={{borderRadius:10, backgroundColor: "#8075FF",}}
                            onPress={() => this.setModalVisible(true)}>
                                <Text style={styles.addAnEvent}
                                    //onPress={() => this.setModalVisible(true)}

                                    title='Add an Event'
                                    color='#8075FF'
                                >
                                    Add an Event
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
            </View>
        );
    }

    // modifies the visibility of the add event pop-up
    setModalVisible = (visible) => {
        this.setState({ show: visible});
    }

    checkFields() {
        var nameCheck = (this.state.name != '');
        var monthCheck = (this.state.month <= 12 && this.state.month >= 1 
            && this.state.month != '');
        var dayCheck = (this.state.day <= 31 && this.state.day >= 1 
            && this.state.day != '');
        var yearCheck = (this.state.year >= 0 && this.state.month != '');
        var hours = this.state.time.substring(0,2);
        var mins = this.state.time.substring(3,5);
        var hoursCheck = (hours <= 23 && hours >= 0  
            && this.state.time <= '');
        var minssCheck = (mins <= 59 && mins >= 0);
        return (nameCheck && monthCheck && dayCheck && yearCheck 
            && hoursCheck && minsCheck);
    }

    // handles the addition of events
    onPressAdd = async () => {
        if (this.checkFields()) {
            var date = this.state.year + '-' + this.state.month + '-' + this.state.day;
            this.setModalVisible(false);
            var userID = Firebase.auth().currentUser.uid;
            var doc = this.db.collection("users").doc(userID)
            var docDetails = await doc.get()
            if (docDetails.exists) {
                var eventMap = docDetails.get("events");
                console.log(eventMap);
                var eventDate = eventMap[date];
                var key = "events." + date;
                // if the date already exists in the map
                if (!eventDate) {
                    console.log("date not found")
                    var dayArr = [];
                    var dateMap = {name: this.state.name, time: this.state.time};
                    dayArr.push(dateMap);
                    doc.update({[key]: dayArr});
                    console.log("map updated");
                    this.setState({items: eventMap})
                    console.log()
                }
                // the date does not exist in the map
                else {
                    console.log("date found");
                    var dayArr = eventDate;
                    var dateMap = {name: this.state.name, time: this.state.time};
                    dayArr.push(dateMap);
                    doc.update({[key]: dayArr});
                    console.log("map updated");
                    this.setState({items: eventMap})
                }
                this.setState({items: eventMap})
            }
            Alert.alert("Event Added")
        }
        else {
            Alert.alert("inncorrect date/time entry \ncheck that it is of the form:\nMM/DD/YYY HH:MM")
        }
        this.clearInput
        
    }

    clearInput() {
        this.setState({
            day: '',
            month: '',
            year: '',
            time: '',
            name: ''
        });
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
        height: Constants.windowHeight * 0.4,
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
        fontSize: Constants.windowWidth * 0.045,
        paddingTop: Constants.windowHeight * 0.045,
        paddingLeft: Constants.windowWidth * 0.05,
        textAlign:'left'
    },
    dateSelection: {
        flexDirection:"row", 
        justifyContent: "flex-start", 
        alignItems: "flex-start",
        padding: 10
    },
    addAnEvent: {
        textAlign:'center',
        color:'#FFFFFF',
        fontSize: Constants.windowHeight * 0.025, 
        padding: Constants.windowHeight * 0.015,
        borderRadius:10
    },
    cancel: {
        justifyContent: 'flex-start',
        color:'#FFFFFF', 
        fontSize: Constants.windowHeight * 0.02,
        padding: Constants.windowHeight * 0.01,
        borderRadius: 10
    },
    addEvent: {
        justifyContent: 'flex-end', 
        color:'#FFFFFF', 
        fontSize: Constants.windowHeight * 0.02,
        padding: Constants.windowHeight * 0.01,
        borderRadius: 10
    }
});
 
 
export default Home