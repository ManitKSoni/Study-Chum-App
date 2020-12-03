import React from 'react'
import { View, ScrollView, Text, KeyboardAvoidingView, StyleSheet, Keyboard, SafeAreaView, Image, Platform, Content } from 'react-native'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import Firebase from '../../config/Firebase'
import ThreadModel from './ThreadModel'
import userInstance from '../Singletons/UserSingleton'

import ThreadHeaderView from './ThreadHeaderView';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Constants from '../../Constants.js'

class Channel extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      messages: []
    }

    this.unsubscribe = () => { }
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

    this.props.navigation.setOptions({ headerTitle: (props) => <ThreadHeaderView onPressHeader={this.onPressHeader} displayName={userData[uid].name} userImage={userData.userImage} /> })
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
    this.props.navigation.dangerouslyGetParent().setOptions({
      tabBarVisible: true
    });
    this.unsubscribe() // Closes the listener
  }


  onSend(messages = []) {
    this.threadModel.sendMessage(messages[0])
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'white',
          },
          left: {
            color: 'black',
          }
        }}
        wrapperStyle={{
          right: {
            backgroundColor: Constants.primaryColor
          },
          left: {
            backgroundColor: '#e5e5ea',
          },
        }}
      />
    );
  }

  render() {
    const { userData, uid } = this.props.route.params;
    return (
      <SafeAreaView style={styles.container}>
          <GiftedChat
            isAnimated
            messages={this.state.messages}
            renderBubble={this.renderBubble}
            onSend={message => this.onSend(message)}
            renderAvatar={null}
            user={{
              _id: uid,
              name: userInstance._user.firstName,
            }}
          />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileImg: {
    width: 35,
    height: 35,
    borderRadius: 40,
    borderColor: 'gray',
    borderWidth: 2,
  },
})

export default Channel