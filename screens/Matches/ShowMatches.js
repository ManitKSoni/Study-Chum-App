import React from 'react'
import {View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity} from 'react-native'
import MatchingAlgorithm from "./MatchingAlgorithm"

class ShowMatches extends React.Component {

   // data = this.createData();

    createData() {
        var pq = MatchingAlgorithm.queue;
        var data = []
        var count = 0;
        while (pq.length != 0) {
            var currStudent = pq.dequeue();
            var currData = {
                id: count.toString(),
                name: currStudent.student.name,
                bio: currStudent.student.bio,
                endorsements: currStudent.student.endorsements
            };
            count++;
            data.push(currData);
        }
        return data; 
    };


    // prob don't need
    deepCopy() {
        var currData = [];
        for(var i = 0; i < this.data.length; i++) {
            currData.push(this.data[i]);
        }
        return currData; 
    }
    
    render() {
        const renderItem = ({item}) => (
            <Item name = {item.name} 
                bio = {item.bio} 
                endorsements = {item.endorsements}
                onPress = {() => this.props.navigation.navigate("Matches")}
            />
        );

        /*var currData = this.deepCopy(); 
        console.log(currData);
        this.data = []; */

        var data = this.createData(); 
        console.log(data);

        return (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        )
        
    }
}

const Item = ({ name, bio, endorsements, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.text}> {name} {bio} {endorsements} </Text>
    </TouchableOpacity>

)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        borderColor: 'black',
        borderWidth: 1,
        marginVertical: 20,
        marginHorizontal: 5
    },

    text: {
        fontSize: 16,
    },
});

export default ShowMatches; 