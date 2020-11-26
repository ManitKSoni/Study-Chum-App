 
import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Text, Button, Alert } from 'react-native'
import * as Constants from '../../Constants.js'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
 
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // currently filled with test events.
            // would be populated with events from the database in the future
            items: {
                '2020-11-22': [{name: 'Study session with Dylan',time: '9:00 AM'},{name: 'Study session with Edward',time: '5:00 PM'}],
                '2020-11-23': [{name: 'Study session with Julio',time: '2:00 PM'}],
                '2020-11-24': [{name: 'Study session with Jessica',time: '12:00 PM'},{name: 'Study session with Bruno',time: '4:00 PM'}],
                '2020-11-25': [{name: 'Study session with Mary',time: '10:00 PM'}],
                '2020-11-26': [{name: 'Study session with John',time: '10:00 AM'}],
                '2020-11-27': [{name: 'Study session with Spicoli',time: '4:20 PM'},{name: 'Study session with Chicken Joe',time: '5:00 PM'}],
                '2020-12-03': [{name: 'Study session with Kendall',time: '5:00 PM'}],
              },
            img: <Image style={{
                width: Constants.windowHeight * .35,
                height: Constants.windowHeight * .35,
                resizeMode: 'contain'
            }} source={require('../../assets/study_chums_logo.png')} ></Image>
        }
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
                        <Button
                        title='Add an Event'
                        color='#8075FF'
                    />
                    </View>
                    
            </View>
        );
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
    text: {
        fontSize:12,
        paddingTop:40,
        paddingRight:10,
        textAlign:'left'
    }
});
 
 
export default Home