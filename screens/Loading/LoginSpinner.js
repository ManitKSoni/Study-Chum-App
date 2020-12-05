import 'react-native-gesture-handler';

import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import Firebase from '../../config/Firebase'
import userInstance from '../Singletons/UserSingleton'

class LoginSpinner extends React.Component {

    /**
     * Listens for changes in authentication
     */ 
    componentDidMount() {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("Auth Changed")
                userInstance.loadUser(user.uid, (exists) => {
                    // If user made account, go to home screen
                    if (exists) { 
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        });
                    } else {
                    // If user has has not finished making account, go to info screen
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }, {name: 'CreateUser'}],
                        });
                    }
                });
            }
            // If user is not logged in, go to login screen
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
        backgroundColor: 'white'
    },
});

export default LoginSpinner

