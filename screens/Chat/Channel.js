import React from 'react'
import { View, ScrollView, Text, KeyboardAvoidingView, Platform, StyleSheet, Keyboard } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Firebase from '../../config/Firebase'
import ThreadModel from './ThreadModel'
import userInstance from '../Singletons/UserSingleton'

import ThreadHeaderView from './ThreadHeaderView';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Constants from '../../Constants.js'
import { SafeAreaView } from 'react-native-safe-area-context'


class Channel extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      messages: []
    }

    this.unsubscribe = () => {}
    this.onPressHeader = this.onPressHeader.bind(this)
  } 


  async onPressHeader() {
    const { uid, userData } = this.props.route.params;
    let snapshot = await Firebase.firestore().collection('users').doc(userData.otherUserID).get()
    this.props.navigation.navigate('UserProfile', {
      userID: uid,
      profile: snapshot.data(),
    });
  } 

  parseMessage(message) {
    if (message.createdAt == NaN) {
      return null
    } 

    const seconds = parseInt(message.createdAt.seconds);
    var date = new Date(0);
    date.setUTCSeconds(seconds)

    message.createdAt = date
    return message
  }

  componentDidMount() {
    const { userData, uid, title } = this.props.route.params;

    this.props.navigation.setOptions({ headerTitle: props => <ThreadHeaderView onPressHeader={this.onPressHeader} displayName={userData[uid].name} userImage={userData.userImage}/>})
    let channelID = userData.channelID 

    this.threadModel = new ThreadModel(channelID)
    this.unsubscribe = this.threadModel.threadListener((messages) => {
      let parsedMessages = messages.map(this.parseMessage)
      this.setState({
        messages: parsedMessages.concat(this.state.messages)
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe() // Closes the listener
  }


  onSend(messages = []) {
    this.threadModel.sendMessage(messages[0])
  }

  render() {
    const { userData, uid } = this.props.route.params;
    return (
      <View style={styles.container}>
        <GiftedChat
          isAnimated
          messages={this.state.messages}
          onSend={message => this.onSend(message)}
          user={{
            _id: uid,
            name: userInstance._user.firstName
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Channel