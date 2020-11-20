import React from 'react'
import { View, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Firebase from '../../config/Firebase'
import ThreadModel from './ThreadModel'
import userInstance from '../Singletons/UserSingleton'

class Channel extends React.Component {
  //userdata - 
  /*Object {
   "message": "Sup",
   "sender": "m1rSvXdEDUT6QatUUWEmSIXO5Wl1",
   "timestamp": Object {
     "nanoseconds": 232000000,
     "seconds": 1605762669,
   },
 }*/

  constructor(props) {
    super(props)

    this.state = {
      messages: []
    }
  } 

  parseMessage(message) {
    const seconds = parseInt(message.createdAt.seconds);
    var date = new Date(0);
    date.setUTCSeconds(seconds)


    message.createdAt = date
    // console.log(message.createdAt, typeof(message.createdAt), date, typeof(date))
    return message
  }

  componentDidMount() {
    const { userData, uid } = this.props.route.params;
    let channelID = userData.channelID 
    this.threadModel = new ThreadModel("test", channelID)
    this.threadListener = this.threadModel.threadListener((messages) => {
      let parsedMessages = messages.map(this.parseMessage)
      this.setState({
        messages: parsedMessages
      })
    })
  }

  componentWillUnmount() {
    // this.threadListener() // Closes the listener
  }


  onSend(messages = []) {
    this.threadModel.sendMessage(messages[0])
    // this.setState((previousState) => {
    //   return {
    //     messages: GiftedChat.append(previousState.messages, messages),
    //   };
    // });
  }

  render() {
    const { userData, uid } = this.props.route.params;
    return (
      <GiftedChat
        isAnimated
        messages={this.state.messages}
        onSend={message => this.onSend(message)}
        user={{
          _id: uid,
          name: userInstance._user.firstName
        }}
      />
    );
  }
}

export default Channel