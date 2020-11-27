import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native'

import * as Constants from '../../Constants.js'
import * as Majors from '../../MajorsList'
import * as Languages from '../../LanguagesList'
import Dropdown from './Dropdown.js'

class UserProfileAnswerView extends React.Component {

    constructor() {
        super()
    }

    /** Generic function for generating {id, name} element-based array based on string array */
    createItemsFromArray(array){
        var data = []
        for (var i = 0; i < array.length; i++) {
            var currData = {
                id: i.toString(),
                name: array[i]
            };
            data.push(currData);
        }
        return data;
    }

    /** Return the next 5 years including the current year **/
    getYearsArray() {
        var data = [];
        const date = new Date();
        const currentYear = date.getFullYear();
        for (var i = 0; i < 6; i++) {
            const yearStr = (currentYear + i).toString();
            var year = {
                id: i.toString(),
                name: yearStr
            };
            data.push(year);
        }
        return data;
    }

    getMajorsArray() {
        return this.createItemsFromArray(Majors.majorsArray);
    }

    getLanguagesArray() {
        return this.createItemsFromArray(Languages.languagesArray);
    }

    updateField(key) {
        return (value) => { this.props.update(key, value) }
    }

    /** 
     * Order of render: Name, Major, Year, Language, Timezone, Bio 
     */
    correctView() {
        switch (this.props.index) {
            case 0:
                return (
                    <View style={styles.answer}>
                        <TextInput
                            style={styles.inputBox}
                            value={this.props.profile.firstName}
                            onChangeText={firstName => this.props.update('firstName', firstName)}
                            placeholder='First Name'
                        />
                        <TextInput
                            style={styles.inputBox}
                            value={this.props.profile.lastName}
                            onChangeText={lastName => this.props.update('lastName', lastName)}
                            placeholder='Last Name'
                        />
                    </View>
                )
            case 1:
                return (
                    <View style={styles.answer}>
                        <Dropdown items={this.getMajorsArray()} update={this.updateField('major')} placeHolder={'Major'} />
                    </View>
                )
            case 2:
                return (
                    <View style={styles.answer}>
                        {/* BOOTLEG METHOD DO NOT TOUCH THIS */}
                        <View></View>
                        <Dropdown items={this.getYearsArray()} update={this.updateField('year')} placeHolder={'Year'} />
                    </View>
                )
            case 3:
                return (
                    <View style={styles.answer}>
                        <Dropdown items={this.getLanguagesArray()} update={this.updateField('language')} placeHolder={'Language'} />
                    </View>
                )
            case 4:
                return (
                    <View style={styles.answer}>
                        <TextInput
                            style={styles.borderBox}
                            multiline={true}
                            maxLength={160}
                            numberOfLines={4}
                            value={this.props.profile.bio}
                            onChangeText={bio => this.props.update('bio', bio)}
                            placeholder='Start Typing Here...'
                        />
                    </View>
                )
            default:
                return (
                    <View></View>
                )
        }
    }
    
    render() {
        return (
            <View>
                {this.correctView()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBox: {
        width: '85%',
        margin: 16,
        fontFamily: 'ProximaNova',
        alignSelf: 'center',
        fontSize: 24,
        borderColor: Constants.boxGrey,
        borderBottomWidth: .5,
        textAlign: 'left'
    },
    answer: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 15
    },
    borderBox: {
        fontFamily: 'ProximaNova',
        width: '90%',
        padding: 10,
        alignSelf: 'center',
        fontSize: 20,
        textAlignVertical: 'top',
        borderWidth: 0.6,
        borderColor: Constants.boxGrey,
        borderRadius: 5,
    }, 
})
const UPAV = new UserProfileAnswerView();
export {UPAV};
export default UserProfileAnswerView