import React from 'react';
import {TouchableOpacity, Text, StyleSheet, FlatList, View, StatusBar} from 'react-native';
import {Drawer} from 'react-native-paper'
import UserSingleton from "../Singletons/UserSingleton"; 
import MatchingAlgorithm from "./MatchingAlgorithm";
import SavedData from "./SavedData"

function createData() {
    var data = []; 
    //Will have to get data from database to display when updated or add to singleton maybe
    var courses = UserSingleton._user.courses;
    let unique = courses.filter((c, index) => {
        return courses.indexOf(c) === index;
    });

    for(var i = 0; i < unique.length; i++) {
        var currData = {
            id: i.toString(),
            course: courses[i]
        }
        data.push(currData); 
    }

    return data; 
};

const Item = ({course, onPress}) => (
    <TouchableOpacity style={styles.item} onPress={onPress}> 
        <Text style={styles.courses}> {course} </Text>
    </TouchableOpacity>
)

export function DrawerContent(props) {

    const onPressGenerate = (course) => {
        props.navigation.navigate("Blank"); //THE GLUE (lets ShowMatches rerender)
        SavedData.changeTitle(course);
        MatchingAlgorithm.getStudentMap(course, () => props.navigation.navigate("ShowMatches", {name: course}));
    }

    var onPressGoToCourses = () => {
        props.navigation.navigate("Blank"); 
        props.navigation.navigate("Courses");
    }

    const renderItem = ({item}) => (
        <Item props={props} course = {item.course} 
            onPress = {() => onPressGenerate(item.course)}
        />
    );

    const data = createData();

    return (
        <View style={{flex:1}}>
           
                <Drawer.Section style ={{borderBottomColor:'white'}}>
                   <View style={{marginTop:45}}> 
                        <Text style={styles.header}> Classes </Text>
                   </View>
                   </Drawer.Section>
          
                 <View>
                    <FlatList
                         data = {data}
                         renderItem = {renderItem}
                         keyExtractor = {(item) => item.id}
                     />
                    </View>
                    <TouchableOpacity onPress = {onPressGoToCourses}>
                        <Text style={styles.addButton}> + Add a class</Text>
                    </TouchableOpacity>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        borderColor: 'white',
        borderBottomColor: 'grey',
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 5,
        paddingBottom: 10
    },

    courses: {
        fontSize: 30,
        textAlign: 'left',
        fontFamily: 'ProximaNova'
    },

    header: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'ProximaNova'
    },

    addButton: {
        fontSize: 30,
        fontFamily: 'ProximaNova',
        color: 'grey'
    }
});
