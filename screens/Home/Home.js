 
import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Text, Button } from 'react-native'
import * as Constants from '../../Constants.js'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
 
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // currently filled with test events.
            // would be populated with events from the database in the future
            items: {
                '2020-11-22': [{name: 'Study session with Dylan \n',time: '9:00 AM'},{name: 'Study session with Edward \n',time: '5:00 PM'}],
                '2020-11-23': [{name: 'Study session with Julio \n',time: '2:00 PM'}],
                '2020-11-24': [{name: 'Study session with Jessica \n',time: '12:00 PM'},{name: 'Study session with Bruno \n',time: '4:00 PM'}],
                '2020-11-25': [{name: 'Study session with Mary \n',time: '7:00 AM'}],
                '2020-11-26': [{name: 'Study session with John \n',time: '10:00 AM'}],
                '2020-11-27': [{name: 'Study session with Spicoli \n',time: '4:20 PM'}],
                '2020-11-28': [{name: 'Study session with Kendall \n',time: '5:00 PM'}],
              },
            img: <Image style={{
                width: Constants.windowWidth * .8,
                height: Constants.windowWidth * .8,
                resizeMode: 'contain'
            }} source={require('../../assets/study_chums_logo.png')} ></Image>
        }
    }
 
    render() {
        return (
            <View style={styles.container}>
                    <View style>
                        {this.state.img}
                        <Agenda
                            items={this.state.items}
                            renderItem={(item, firstItemInDay) =>
                                {return (<Text style={styles.text}>{item.name}{item.time}</Text>);}}
                            renderEmptyData = {(item, firstItemInDay) =>
                                {return (<Text style={styles.text}></Text>);}}
                            //renderDay={(day, item) => {return (<Text>{item.name}</Text>);}}
                            //ScrollRange={50}
                            theme={{
                            //backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            selectedDayBackgroundColor: '#8075FF',
                            selectedDayTextColor: '#FFFFFF',
                            todayTextColor: '#8075FF',
                            dotColor: '#8075FF',
                            agendaKnobColor: '#000000',
                            monthTextColor: '#8075FF',
                            agendaTodayColor: '#8075FF',
                            width:Constants.windowWidth
                            }}
                        />
                    </View>
                   <Button
 
                   title='Add an Event'
                   color='#8075FF'
                   />
            </View>
        )
    }
}
 
const styles = StyleSheet.create({
    container: {
        width:Constants.windowWidth,
        paddingTop:50,
        paddingBottom: 25,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',  
    },
    text: {
        paddingTop:40,
        paddingRight:10,
        textAlign:'left'
    }
});
 
 
export default Home