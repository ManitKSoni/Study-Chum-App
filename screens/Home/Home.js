 
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Alert, Modal, TextInput, Platform } from 'react-native';
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
        // holds the event items for the calendar
        items: {},
        // tells wether the add event pop-up is shown
        showAdd: false,
        showConfirm: false,
        // subtraction adjusts for the 8 hour gap bug
        today: this.timeToString(Date.now() - 28800000 ),
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
        descBack: Constants.calendarInputBox,
        monthBack: Constants.calendarInputBox,
        dayBack: Constants.calendarInputBox,
        yearBack: Constants.calendarInputBox,
        hourBack: Constants.calendarInputBox,
        minBack: Constants.calendarInputBox,
        timeOfDayBack: Constants.calendarInputBox,
    };

    /** Called on Home screen being rendered */
    componentDidMount() {
        this.fetchUserDetails();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
 
    render() {
        return (
            <View style={styles.container}>
                    <View>
                        <Image style={styles.titleImage} 
                        source={require('../../assets/study_chums_title.png')} ></Image>
                        <Agenda style={styles.calendar}
                            items={this.state.items}
                            loadItemsForMonth={this.loadItems.bind(this)}
                            renderItem={this.renderItem.bind(this)}
                            rowHasChanged={this.rowHasChanged.bind(this)} 
                            selected={this.state.today}
                            renderKnob={() => {return(<Image style={{
                                width: Constants.windowHeight * .11,
                                height: Constants.windowHeight * .035,
                                resizeMode:'stretch'
                            }} source={require('../../assets/drop_down_arrow.png')} ></Image>)}}
                            theme={{
                            calendarBackground: '#ffffff',
                            selectedDayBackgroundColor: Constants.secondaryColor,
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: Constants.secondaryColor,
                            dotColor: Constants.secondaryColor,
                            agendaKnobColor: '#000000',
                            monthTextColor: Constants.secondaryColor,
                            agendaTodayColor: Constants.secondaryColor,
                            }}
                        />
                        <Modal
                          animationType="slide"
                          transparent={true}
                          visible={this.state.showAdd}
                        >
                            <View style = {styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{paddingBottom: Constants.windowHeight * 0.012}}>
                                        <Text style={{paddingBottom: Constants.windowHeight*0.015, textAlign:'center', 
                                        fontSize: Constants.windowHeight * 0.017}}>
                                            Event Description
                                        </Text>
                                        <TextInput 
                                            style={{height: Constants.windowHeight * 0.026, width: Constants.windowWidth * 0.55, 
                                                textAlign:'center', borderRadius: 5}}
                                            placeholder="Type an event description"
                                            maxLength = {40}
                                            placeholderTextColor='#8a8a8a'
                                            backgroundColor={this.state.descBack}
                                            onChangeText={name => this.setState({ name })}
                                        />
                                    </View>

                                    <View style={{flexDirection:"row", justifyContent: "flex-start", alignItems: "flex-start",}}>
                                        <View style={{flexDirection:"column", justifyContent: "flex-start"}}>
                                            <View >
                                            <View style={styles.dateSelection}>
                                                <Text style={styles.inputLabel}>
                                                    Month:
                                                </Text>
                                            </View>
                                            <View style={styles.dateSelection}>
                                                <Text style={styles.inputLabel}>
                                                    Day: 
                                                </Text>
                                            </View>
                                            <View style={styles.dateSelection}>
                                                <Text style={styles.inputLabel}>
                                                    Year: 
                                                </Text>
                                            </View>
                                            <View style={styles.dateSelection}>
                                                <Text style={styles.inputLabel}>
                                                    Hour: 
                                                </Text>
                                            </View>
                                            <View style={styles.dateSelection}>
                                                <Text style={styles.inputLabel}>
                                                    Minute: 
                                                </Text>
                                            </View>
                                            <View style={styles.dateSelection}>
                                                <Text style={styles.inputLabel}>
                                                    Time of Day: 
                                                </Text>
                                            </View>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:"column"}}>
                                        <View >
                                            <View style={styles.dateSelection} >
                                                <TextInput  
                                                style={styles.textInput}
                                                keyboardType = 'numeric'
                                                maxLength = {2}
                                                placeholder="MM"
                                                placeholderTextColor='#8a8a8a'
                                                backgroundColor={this.state.monthBack}
                                                onChangeText={month => this.setState({ month })}
                                                />
                                            </View>
                                            <View style={styles.dateSelection}>
                                                <TextInput 
                                                style={styles.textInput}
                                                keyboardType = 'numeric'
                                                maxLength = {2}
                                                placeholder="DD"
                                                placeholderTextColor='#8a8a8a'
                                                backgroundColor={this.state.dayBack}
                                                onChangeText={day => this.setState({ day })}
                                                />
                                            </View>
                                            <View style={styles.dateSelection}>
                                                <TextInput 
                                                style={styles.textInput}
                                                keyboardType = 'numeric'
                                                maxLength = {4}
                                                placeholder="YYYY"
                                                placeholderTextColor='#8a8a8a'
                                                backgroundColor={this.state.yearBack}
                                                onChangeText={year => this.setState({ year })}
                                                />
                                            </View>
                                            <View style={styles.dateSelection}>
                                                <TextInput 
                                                style={styles.textInput}
                                                keyboardType = 'numeric'
                                                maxLength = {2}
                                                placeholder="hh"
                                                placeholderTextColor='#8a8a8a'
                                                backgroundColor={this.state.hourBack}
                                                onChangeText={hour => this.setState({ hour })}
                                                />
                                            </View>
                                            <View style={styles.dateSelection}>
                                                <TextInput 
                                                style={styles.textInput}
                                                keyboardType = 'numeric'
                                                maxLength = {2}
                                                placeholder="mm"
                                                placeholderTextColor='#8a8a8a'
                                                backgroundColor={this.state.minBack}
                                                onChangeText={minute => this.setState({ minute })}
                                                />
                                            </View>
                                            <View style={styles.dateSelection}>
                                                <TextInput 
                                                style={styles.textInput}
                                                maxLength = {2}
                                                placeholder="AM/PM"
                                                placeholderTextColor='#8a8a8a'
                                                backgroundColor={this.state.timeOfDayBack}
                                                onChangeText={timeOfDay => this.setState({ timeOfDay: timeOfDay.toUpperCase() })}
                                                />
                                            </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:"row", paddingTop: Constants.windowHeight * 0.01}}>
                                        <View style={{paddingRight: Constants.windowWidth * 0.05}}>
                                        <TouchableOpacity style={{borderRadius:10, backgroundColor: Constants.secondaryColor, 
                                        paddingHorizontal: Constants.windowWidth * 0.03}}
                                            onPress={() => this.setAddVisible(false)}>
                                            <Text style={styles.cancel}>
                                                Cancel     
                                            </Text>
                                        </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={{borderRadius:10, backgroundColor: Constants.secondaryColor,}}
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
                        <Modal
                          animationType="slide"
                          transparent={true}
                          visible={this.state.showConfirm}
                        >
                            <View style = {styles.centeredView}>
                                <View style = {styles.confirmView}>
                                    <Text style = {{textAlign: 'center', fontSize: Constants.windowHeight * 0.027, 
                                    paddingBottom: Constants.windowHeight * 0.02}}>
                                        Event Added
                                    </Text>
                                    <TouchableOpacity style={{borderRadius:10, backgroundColor: Constants.secondaryColor, 
                                    paddingHorizontal: Constants.windowWidth * 0.07}}
                                            onPress={() => this.setConfirmVisible(false)}>
                                            <Text style={styles.addEvent}>
                                                OK
                                            </Text>
                                        </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <View style={{paddingTop:Constants.windowHeight * 0.02}}>
                            <TouchableOpacity style={{borderRadius:10, backgroundColor: Constants.secondaryColor,}}
                            onPress={() => this.setAddVisible(true)}>
                                <Text style={styles.addAnEvent}>
                                    Add an Event
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
            </View>
        );
    }

    // modifies the visibility of the add event pop-up
    setAddVisible = (visible) => {
        this.setState({ showAdd: visible});
        if (visible == false) {
            this.setState({
                descBack: Constants.calendarInputBox,
                monthBack: Constants.calendarInputBox,
                dayBack: Constants.calendarInputBox,
                yearBack: Constants.calendarInputBox,
                hourBack: Constants.calendarInputBox,
                minBack: Constants.calendarInputBox,
                timeOfDayBack: Constants.calendarInputBox,
            });
            this.loadItems({timestamp: Date.now()});
            //console.log("items:", this.state.items);
        }
        else {
            this.clearInput();
        }
    }

    setConfirmVisible = (visible) => {
        this.setState({showConfirm: visible});
    }

    /** Checks all fields for valid user input */
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

    /** checks for valid event description user input */
    checkName() {
        var nameCheck = (this.state.name != '');
        if (!nameCheck) {
            this.setState({descBack: Constants.invalidInputBox})
        }
        else {
            this.setState({descBack: Constants.calendarInputBox})
        }
        return nameCheck;
    }

    /** Checks for valid month user input */
    checkMonth() {
        var month = this.state.month;
        var monthCheck = (month <= 12 && month >= 1 
            && month.length == 2);
        if (!monthCheck) {
            this.setState({monthBack: Constants.invalidInputBox})
        }
        else {
            this.setState({monthBack: Constants.calendarInputBox})
        }
        return monthCheck;
    }

    /** Checks for valid day user input */
    checkDay() {
        var day = this.state.day;
        var month = this.state.month;
        var year = this.state.year;
        var dayCheck = (day >= 1 && day.length == 2);
        var dateCheck = 0
        switch (month) {
            case "01": 
            case "03":
            case "05":
            case "07": 
            case "08":
            case "10":
            case "12": 
                dateCheck = (day <= 31);
                break;
            case "04":
            case "06":
            case "09":
            case "11": 
                console.log("4,6,9")
                dateCheck = (day <= 30);
                break;
            case "02" : 
                if ((year % 4) == 0) {
                    dateCheck = (day <= 29);
                }
                else {
                    dateCheck = (day <= 28);
                }
                break;
        }
        dayCheck = dayCheck && dateCheck;
        if (!dayCheck) {
            this.setState({dayBack: Constants.invalidInputBox})
        }
        else {
            this.setState({dayBack: Constants.calendarInputBox})
        }
        return dayCheck;
    }

    /** Checks for valid year user input */
    checkYear() {
        var year = this.state.year;
        var yearCheck = (year >= 0 && year.length === 4);
        if (!yearCheck) {
            this.setState({yearBack: Constants.invalidInputBox})
        }
        else {
            this.setState({yearBack: Constants.calendarInputBox})
        }
        return yearCheck;
    }

    /** Checks for valid hour user input */
    checkHour() {
        var hour = this.state.hour;
        var hourCheck = (hour <= 12 && hour >= 1  
            && hour.length) == 2;
        if (!hourCheck) {
            this.setState({hourBack: Constants.invalidInputBox})
        }
        else {
            this.setState({hourBack: Constants.calendarInputBox})
        }
        return hourCheck;
    }

    /** Checks for valid minute user input */
    checkMin() {
        var min = this.state.minute;
        var minCheck = (min <= 59 && min >= 0
            && min.length == 2);
        if (!minCheck) {
            this.setState({minBack: Constants.invalidInputBox})
        }
        else {
            this.setState({minBack: Constants.calendarInputBox})
        }
        return minCheck;
    }

    // checks for valid time of day user input
    checkTimeOfDay() {
        var timeOfDay = this.state.timeOfDay;
        var timeOfDayCheck = (timeOfDay == "AM" || 
        timeOfDay == "PM");
        if (!timeOfDayCheck) {
            this.setState({timeOfDayBack: Constants.invalidInputBox})
        }
        else {
            this.setState({timeOfDayBack: Constants.calendarInputBox})
        }
        return timeOfDayCheck;
    }

    // formats a string to be displayed based off of user input
    formatTime() {
        var time = this.state.hour + ":" + this.state.minute + " " + this.state.timeOfDay;
        this.setState({time: time});
    }

    // sort function used to rank events by thier scheduled time
    sortTime(a, b) {
        var aTime = a.time;
        var aTimeVal = (aTime.substring(0,2)%12) + aTime.substring(3,5);
        var aTimeOfDay = aTime.substring(6,8);
        if (aTimeOfDay == 'PM') {
            aTimeVal = aTimeVal + '1200';
        }
        var bTime = b.time;
        var bTimeVal = (bTime.substring(0,2)%12) + bTime.substring(3,5);
        var bTimeOfDay = bTime.substring(6,8);
        if (bTimeOfDay == 'PM') {
            bTimeVal = bTimeVal + '1200';
        }
        return aTimeVal - bTimeVal;
    }

    // handles the addition of events
    onPressAdd = async () => {
        if (this.checkFields()) {
            this.formatTime();
            var date = this.state.year + '-' + this.state.month + '-' + this.state.day;
            var userID = Firebase.auth().currentUser.uid;
            var doc = this.db.collection("users").doc(userID)
            var docDetails = await doc.get()
            if (docDetails.exists) {
                //var eventMap = docDetails.get("events");
                //console.log(eventMap);
                var eventMap = this.state.items;
                var eventDate = eventMap[date];
                var key = "events." + date;
                // if the date already exists in the map
                if (!eventDate) {
                    //console.log("date not found")
                    var dayArr = [];
                    var dateMap = {name: this.state.name, time: this.state.time};
                    dayArr.push(dateMap);
                    doc.update({[key]: dayArr});
                    //console.log("map updated");
                }
                // the date does not exist in the map
                else {
                    //console.log("date found");
                    var dayArr = eventDate;
                    var dateMap = {name: this.state.name, time: this.state.time};
                    dayArr.push(dateMap);
                    dayArr.sort(this.sortTime);
                    doc.update({[key]: dayArr});
                    //console.log("map updated");
                    this.state.items[date] = dateMap;
                }
                this.setConfirmVisible(true);
            }
            this.setAddVisible(false);
        }
        else {
            Alert.alert("Invalid date/time entry");
        }
    }

    // clears the saved user input for creating an event
    clearInput() {
        this.setState({
            day: '',
            month: '',
            year: '',
            hour: '',
            minute: '',
            timeOfDay: '',
            name: '',
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

    // loads the day items to be displayed on the agenda 
    loadItems(day) {
        //this.fetchUserDetails();
        //console.log("timestamp:", day.timestamp);
        //console.log("Date.now(): ", Date.now());
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
            <View style={{paddingRight: Constants.windowWidth * 0.08,}}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        );
      }

      // converts time to a string format accepted by the agenda component
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
    titleImage: {
        width: Constants.windowHeight * .40,
        height: Constants.windowHeight * .17,
        resizeMode: 'contain'
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
        height: Constants.windowHeight * 0.54,
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
    confirmView: {
        margin: Constants.windowHeight * 0.2,
        width: Constants.windowWidth * 0.7,
        height: Constants.windowHeight * 0.16,
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
    time: {
        fontSize: Constants.windowWidth * 0.037,
        fontWeight: "700",
        paddingTop: Constants.windowHeight * 0.003,
        paddingLeft: Constants.windowWidth * 0.05,
        textAlign:'left'
    },
    dateSelection: {
        flexDirection:"row", 
        justifyContent: "flex-start", 
        alignItems: "flex-start",
        padding: Constants.windowHeight * 0.015,
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
    },
    inputLabel: {
        fontSize: Constants.windowHeight * 0.017, 
        height: Constants.windowHeight * 0.026
    },
    textInput: {
        height: Constants.windowHeight * 0.026, 
        width:Constants.windowWidth * 0.14, borderRadius: 5, 
        textAlign:'center', 
        fontSize: Constants.windowHeight * 0.017
    }
});
 
 
export default Home