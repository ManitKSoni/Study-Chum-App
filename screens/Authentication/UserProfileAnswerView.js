import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native'

import * as Constants from '../../Constants.js'
import * as MajorsList from '../../MajorsList';
import Dropdown from './Dropdown.js'

class UserProfileAnswerView extends React.Component {

    constructor() {
        super()
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
        const majorsArray = MajorsList.majorsArray;
        var data = []
        for (var i = 0; i < majorsArray.length; i++) {
            var currData = {
                id: i.toString(),
                name: majorsArray[i]
            };
            data.push(currData);
        }
        return data;
    }

    getLanguagesArray() {
        return [
            {
                id: 1,
                name: 'English',
            },
            {
                id: 2,
                name: 'Spanish',
            },
            {
                id: 3,
                name: 'French',
            },
            {
                id: 4,
                name: 'German',
            },
            {
                id: 5,
                name: 'Chinese',
            },
            {
                id: 6,
                name: 'Japanese',
            },
            {
                id: 7,
                name: 'Korean',
            },
            {
                id: 8,
                name: 'Sanskrit',
            },
        ];
    }

    getTimezonesArray(){
        return [
            {
                id: 0,
                name: 'Timezone UTC 8 BLAH BLAH'
            }
        ]
    }

    updateField(key) {
        return (value) => { this.props.update(key, value) }
    }

    /**Order of render: Name, Major, Year, Language, Timezone, Bio */
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
                        <Dropdown items={this.getMajorsArray()} update={this.updateField('major')} placeHolder={'Major'}/>
                    </View>
                )
            case 2:
                return (
                    <View style={styles.answer}>
                        <Dropdown items={this.getYearsArray()} update={this.updateField('year')} placeHolder={'Year'} /> 
                    </View>
                )
            case 3:
                return (
                    <View style={styles.answer}>
                        <Dropdown items={this.getLanguagesArray()} update={this.updateField('language')} placeHolder={'Language'}/>
                    </View>
                )
            case 4:
                return (
                    <View style={styles.answer}>
                        <Dropdown items={this.getTimezonesArray()} update={this.updateField('timezone')} placeHolder={'Timezone UTC+8:00'} />
                    </View>
                )
            case 5:
                return (
                    //TODO textbox input with max char limit and dynamic expansion
                    <View style={styles.answer}>
                        <TextInput
                            style={styles.inputBox}
                            value={this.props.profile.bio}
                            onChangeText={bio => this.props.update('bio', bio)}
                            placeholder='Bio'
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
})

export default UserProfileAnswerView