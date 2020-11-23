import React, { Fragment } from 'react';
import { View, TextInput, StyleSheet } from 'react-native'
import SearchableDropdown from 'react-native-searchable-dropdown';

import * as Constants from '../../Constants.js'


var Language = [
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

class Dropdown extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Fragment>
                <SearchableDropdown
                    onItemSelect={(item) => {
                        //this.setState({ userProfile.year : items });
                        this.props.update('year', item.name)
                        console.log(this.props.profile)
                    }}
                    containerStyle={{ padding: 5 }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#ddd',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 5,
                    }}
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 115 }}
                    items={this.props.items}
                    resetValue={false}
                    textInputProps={
                        {
                            placeholder: "choose a year!",
                            underlineColorAndroid: "transparent",
                            style: {
                                padding: 12,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                            },
                        }
                    }
                    listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                    }
                />
            </Fragment>
        )
    }
}

export default Dropdown