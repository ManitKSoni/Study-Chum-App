 
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Button, Alert, Modal, TextInput, Platform } from 'react-native';
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
        
        this.fetchUserDetails();
    }

    state = {
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
        hour: '',
        minute: '',
        timeOfDay: '',
        time: '',
        // backround of event text input
        descBack: "#ececec",
        monthBack: "#ececec",
        dayBack: "#ececec",
        yearBack: "#ececec",
        hourBack: "#ececec",
        minBack: "#ececec",
        timeOfDayBack: "#ececec",
    };

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
                            selected={ this.getTodaysDate.bind(this) }
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
                                    <View style={{paddingBottom: Constants.windowHeight * 0.012}}>
                                        <Text style={{paddingBottom: 10, textAlign:'center'}}>
                                            Event Description
                                        </Text>
                                        <TextInput 
                                            style={{height: 20, width: Constants.windowWidth * 0.55, textAlign:'center', borderRadius: 5}}
                                            placeholder="Type an event description"
                                            placeholderTextColor='#8a8a8a'
                                            backgroundColor={this.state.descBack}
                                            onChangeText={name => this.setState({ name })}
                                        />
                                    </View>
                                    <View style={styles.dateSelection} >
                                        <Text style={{paddingRight:Constants.windowWidth * 0.1}}>
                                            Month:
                                        </Text>
                                        <TextInput  
                                        style={{height: 20, width:Constants.windowWidth * 0.14, borderRadius: 5, textAlign:'center'}}
                                        keyboardType = 'numeric'
                                        maxLength = {2}
                                        placeholder="MM"
                                        placeholderTextColor='#8a8a8a'
                                        backgroundColor={this.state.monthBack}
                                        onChangeText={month => this.setState({ month })}
                                        />
                                    </View>
                                    <View style={styles.dateSelection}>
                                        <Text style={{paddingRight:Constants.windowWidth * 0.14, fontSize: Constants.windowHeight * 0.017}}>
                                            Day: 
                                        </Text>
                                        <TextInput 
                                        style={{height: 20, width:Constants.windowWidth * 0.14, borderRadius: 5, textAlign:'center', fontSize: Constants.windowHeight * 0.017}}
                                        keyboardType = 'numeric'
                                        maxLength = {2}
                                        placeholder="DD"
                                        placeholderTextColor='#8a8a8a'
                                        backgroundColor={this.state.dayBack}
                                        onChangeText={day => this.setState({ day })}
                                        />
                                    </View>
                                    <View style={styles.dateSelection}>
                                        <Text style={{paddingRight:Constants.windowWidth * 0.13, fontSize: Constants.windowHeight * 0.017}}>
                                            Year: 
                                        </Text>
                                        <TextInput 
                                        style={{height: 20, width:Constants.windowWidth * 0.14, borderRadius: 5, textAlign:'center', fontSize: Constants.windowHeight * 0.017}}
                                        keyboardType = 'numeric'
                                        maxLength = {4}
                                        placeholder="YYYY"
                                        placeholderTextColor='#8a8a8a'
                                        backgroundColor={this.state.yearBack}
                                        onChangeText={year => this.setState({ year })}
                                        />
                                    </View>
                                    <View style={styles.dateSelection}>
                                        <Text style={{paddingRight:Constants.windowWidth * 0.13, fontSize: Constants.windowHeight * 0.017}}>
                                            Hour: 
                                        </Text>
                                        <TextInput 
                                        style={{height: 20, width:Constants.windowWidth * 0.14, borderRadius: 5, textAlign:'center', fontSize: Constants.windowHeight * 0.017}}
                                        keyboardType = 'numeric'
                                        maxLength = {2}
                                        placeholder="hh"
                                        placeholderTextColor='#8a8a8a'
                                        backgroundColor={this.state.hourBack}
                                        onChangeText={hour => this.setState({ hour })}
                                        />
                                    </View>
                                    <View style={styles.dateSelection}>
                                        <Text style={{paddingRight:Constants.windowWidth * 0.1, fontSize: Constants.windowHeight * 0.017}}>
                                            Minute: 
                                        </Text>
                                        <TextInput 
                                        style={{height: 20, width:Constants.windowWidth * 0.14, borderRadius: 5, textAlign:'center', fontSize: Constants.windowHeight * 0.017}}
                                        keyboardType = 'numeric'
                                        maxLength = {2}
                                        placeholder="mm"
                                        placeholderTextColor='#8a8a8a'
                                        backgroundColor={this.state.minBack}
                                        onChangeText={minute => this.setState({ minute })}
                                        />
                                    </View>
                                    <View style={styles.dateSelection}>
                                        <Text style={{paddingRight:Constants.windowWidth * 0.02, fontSize: Constants.windowHeight * 0.017}}>
                                            Time of Day: 
                                        </Text>
                                        <TextInput 
                                        style={{height: 20, width:Constants.windowWidth * 0.14, borderRadius: 5, textAlign:'center', fontSize: Constants.windowHeight * 0.017}}
                                        maxLength = {2}
                                        placeholder="AM/PM"
                                        placeholderTextColor='#8a8a8a'
                                        backgroundColor={this.state.timeOfDayBack}
                                        onChangeText={timeOfDay => this.setState({ timeOfDay })}
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
                                {Platform.OS === 'ios' &&
                                <KeyboardSpacer/>}
                            </View>
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
        this.clearInput();
    }

    checkFields() {
        var nameCheck = this.checkName();
        var monthCheck = this.checkMonth();
        var dayCheck = this.checkDay();
        var yearCheck = this.checkYear();
        var hoursCheck = this.checkHour();
        var minsCheck = this.checkMin();
        var timeOfDayCheck = this.checkTimeOfDay();
        return (nameCheck && monthCheck && dayCheck && yearCheck 
            && hoursCheck && minsCheck && timeOfDayCheck);
    }

    checkName() {
        var nameCheck = (this.state.name != '');
        if (!nameCheck) {
            this.setState({descBack: "#FFCCCB"})
        }
        else {
            this.setState({descBack: "#ececec"})
        }
        return nameCheck;
    }

    checkMonth() {
        var month = this.state.month;
        var monthCheck = (month <= 12 && month >= 1 
            && month.length == 2);
        if (!monthCheck) {
            this.setState({monthBack: "#FFCCCB"})
        }
        else {
            this.setState({monthBack: "#ececec"})
        }
        return monthCheck;
    }

    checkDay() {
        var day = this.state.day;
        var dayCheck = (day <= 31 && day >= 1 
            && day.length == 2);
        if (!dayCheck) {
            this.setState({dayBack: "#FFCCCB"})
        }
        else {
            this.setState({dayBack: "#ececec"})
        }
        return dayCheck;
    }

    checkYear() {
        var year = this.state.year;
        var yearCheck = (year >= 0 && year.length === 4);
        if (!yearCheck) {
            this.setState({yearBack: "#FFCCCB"})
        }
        else {
            this.setState({yearBack: "#ececec"})
        }
        return yearCheck;
    }

    checkHour() {
        var hour = this.state.hour;
        var hourCheck = (hour <= 12 && hour >= 1  
            && hour.length) == 2;
        if (!hourCheck) {
            this.setState({hourBack: "#FFCCCB"})
        }
        else {
            this.setState({hourBack: "#ececec"})
        }
        return hourCheck;
    }

    checkMin() {
        var min = this.state.minute;
        var minCheck = (min <= 59 && min >= 0
            && min.length == 2);
        if (!minCheck) {
            this.setState({minBack: "#FFCCCB"})
        }
        else {
            this.setState({minBack: "#ececec"})
        }
        return minCheck;
    }

    checkTimeOfDay() {
        var min = this.state.timeOfDay;
        var timeOfDayCheck = (this.state.timeOfDay == "AM" || 
        this.state.timeOfDay == "PM");
        if (!timeOfDayCheck) {
            this.setState({timeOfDayBack: "#FFCCCB"})
        }
        else {
            this.setState({timeOfDayBack: "#ececec"})
        }
        return timeOfDayCheck;
    }

    formatTime() {
        var time = this.state.hour + ":" + this.state.minute + " " + this.state.timeOfDay;
        this.setState({time: time});
    }

    timeToInt(time) {
        console.log(time);
        var timeVal = time.substring(0,2) + time.substring(3,5);
        console.log("timeVal: ", timeVal);
        //timeVal = parseInt(timeVal);
        var timeOfDay = time.substring(6,8);
        if (timeOfDay == 'PM') {
            timeVal = timeVal + '1200'
        }
        console.log(timeVal);
        return timeVal;
    }

    sortTime(a, b) {
        var aTime = a.time;
        var aTimeVal = aTime.substring(0,2) + aTime.substring(3,5);
        var aTimeOfDay = aTime.substring(6,8);
        if (aTimeOfDay == 'PM') {
            aTimeVal = aTimeVal + '1200'
        }
        var bTime = b.time;
        var bTimeVal = bTime.substring(0,2) + bTime.substring(3,5);
        var bTimeOfDay = bTime.substring(6,8);
        if (bTimeOfDay == 'PM') {
            bTimeVal = bTimeVal + '1200'
        }
        //var aVal = this.timeToInt(aTime);
        //var bVal = this.timeToInt(bTime);
        return aTimeVal - bTimeVal;
    }

    // handles the addition of events
    onPressAdd = async () => {
        if (this.checkFields()) {
            this.formatTime();
            var date = this.state.year + '-' + this.state.month + '-' + this.state.day;
            this.setModalVisible(false);
            var userID = Firebase.auth().currentUser.uid;
            var doc = this.db.collection("users").doc(userID)
            var docDetails = await doc.get()
            if (docDetails.exists) {
                var eventMap = docDetails.get("events");
                //console.log(eventMap);
                //var eventMap = this.state.items;
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
                    //this.setState({items: eventMap})
                }
                // the date does not exist in the map
                else {
                    console.log("date found");
                    var dayArr = eventDate;
                    var dateMap = {name: this.state.name, time: this.state.time};
                    dayArr.push(dateMap);
                    dayArr.sort(this.sortTime);
                    doc.update({[key]: dayArr});
                    console.log("map updated");
                    this.state.items[date] = dateMap;
                    //this.setState({items: eventMap})
                }
                this.setState({items: eventMap})
                //console.log(this.state.items);
                this.setState({year: ''})
            }
            Alert.alert("Event Added")
            this.clearInput
        }
        else {
            Alert.alert("Invalid date/time entry");
        }
        //this.clearInput();
        this.forceUpdate();
    }

    clearInput() {
        this.setState({
            day: '',
            month: '',
            year: '',
            time: '',
            name: '',
            descBack: "#ececec",
            monthBack: "#ececec",
            dayBack: "#ececec",
            yearBack: "#ececec",
            hourBack: "#ececec",
            minBack: "#ececec",
            timeOfDayBack: "#ececec",
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
    getTodaysDate()  {
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var day = new Date().getDate();
        if (day.length == 1) {
            day = "0 " + day;
        }
        var formattedDate = year + '-' + month + "-" + day;
        console.log(formattedDate);
        this.setState({today: formattedDate});
        return (formattedDate.toString);
    }

    // loads the day items to be displayed on the agenda 
    loadItems(day) {
        setTimeout(() => {
          for (let i = -15; i < 85; i++) {
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
        marginTop: Constants.windowHeight * 0.01
    },
    modalView: {
        margin: Constants.windowHeight * 0.2,
        width: Constants.windowWidth * 0.7,
        height: Constants.windowHeight * 0.52,
        backgroundColor: "white",
        borderRadius: 20,
        padding: Constants.windowHeight * 0.026,
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
        padding: Constants.windowHeight * 0.015,
        fontSize: Constants.windowHeight * 0.01
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