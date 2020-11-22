import React from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Firebase from '../../config/Firebase'
import ThreadModel from './ThreadModel'
import userInstance from '../Singletons/UserSingleton'

class Channel extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      messages: []
    }
    this.unsubscribe = () => {}
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
    this.props.navigation.setOptions({title: title})
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
      <View style={{flex: 1}}>
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

export default Channel