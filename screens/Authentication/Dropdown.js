import React, { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

import * as Constants from '../../Constants.js'

class Dropdown extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <Fragment>
                <SearchableDropdown
                    onItemSelect={(item) => {
                        this.props.update(item.name)
                    }}
                    containerStyle={styles.searchContainer}
                    itemStyle={styles.searchItem}
                    itemTextStyle={styles.searchItemText}
                    itemsContainerStyle={styles.searchItemsContainer}
                    items={this.props.items}
                    resetValue={false}
                    textInputProps={
                        {
                            placeholder: this.props.placeHolder,
                            underlineColorAndroid: "transparent",
                            style: styles.searchTextInput
                        }
                    }
                    listProps={{nestedScrollEnabled: true}}
                />
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    searchContainer: {
        padding : 15,
        backgroundColor: 'white'
    },
    searchItem: {
        backgroundColor: 'grey',
        marginHorizontal: 5,
        marginVertical: 5,
    },
    searchItemText: {
        color: 'black',
        fontSize: 16,
        backgroundColor: 'grey',
    },
    searchItemsContainer: {
        maxHeight: 140,
        backgroundColor: 'grey',
        width: '90%',
        alignSelf: 'center',
    },
    searchTextInput: {
        width: '90%',
        margin: 16,
        fontFamily: 'ProximaNova',
        alignSelf: 'center',
        fontSize: 24,
        borderColor: Constants.boxGrey,
        borderBottomWidth: .5,
        textAlign: 'left',
        backgroundColor: 'white'
    },
})

export default Dropdown