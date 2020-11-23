import React, { Fragment } from 'react';
import { View, TextInput, StyleSheet } from 'react-native'

import * as Constants from '../../Constants.js'
import * as MajorsList from '../../MajorsList';
import Dropdown from './Dropdown.js'

var years = [
    {
        id: 1,
        name: '2021',
    },
    {
        id: 2,
        name: '2022',
    },
    {
        id: 3,
        name: '2023',
    },
    {
        id: 4,
        name: '2024',
    },
    {
        id: 5,
        name: '2025',
    },
];

class UserProfileAnswerView extends React.Component {

    constructor() {
        super()
    }
    
    getYearsArray() {
        //TODO do some date stuff 
        return ['year']
    }

    getMajorsArray() {
        return MajorsList.majorsArray;
    }

    getLanguagesArray() {

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
                        <Dropdown items={this.getMajorsArray()} update={this.updateField('major')} placeHolder={'Major'} />
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
                        <Dropdown items={this.getLanguagesArray()} update={this.updateField('language')} placeHolder={'Language'} />
                    </View>
                )
            case 4:
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