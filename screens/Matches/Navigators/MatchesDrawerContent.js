import React from 'react';
import {TouchableOpacity, Text, StyleSheet, FlatList, View, StatusBar} from 'react-native';
import {Drawer} from 'react-native-paper'
import {createDrawerData} from '../Controllers/CreateData';
import MatchingAlgorithm from "../Controllers/MatchingAlgorithm";
import SavedData from "../Controllers/SavedData"
import * as Constants from "../../../Constants"

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

    const data = createDrawerData();

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
        flex:1,
        borderColor: 'white',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.50,
        marginVertical: 5,
        marginHorizontal: 5,
        paddingBottom: 10
    },
    courses: {
        fontSize: Constants.windowWidth * .08,
        textAlign: 'left',
        fontFamily: 'ProximaNova'
    },

    header: {
        fontSize: Constants.windowWidth * .08,
        textAlign: 'center',
        fontFamily: 'ProximaNova'
    },

    addButton: {
        fontSize: Constants.windowWidth * .085,
        fontFamily: 'ProximaNova',
        color: 'grey'
    }
});
