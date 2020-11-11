import 'react-native-gesture-handler';

import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import Firebase from '../../config/Firebase'
import userInstance from '../Singletons/UserSingleton'

class LoginSpinner extends React.Component {

    componentDidMount() {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                userInstance.loadUser(user.uid) // Loads the user singleton
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            }
            else {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
});

export default LoginSpinner

