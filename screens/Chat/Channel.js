import React from 'react'
import { View, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Firebase from '../../config/Firebase'

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

  componentWillMount() {
    this.setState({
      messages: [
        {
        _id: 1,
        text: 'epic bro !',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }
        },
        {
          _id: 2,
          text: 'What side is this gonna be on',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'lloyd',
            avatar: 'https://placeimg.com/140/140/any',
        }},
      ],
    
    },);
  }

  get user(){
    return {
      _id: userData[uid],
      name: this.props.navigation.state.params.name
    }
  }

  componentDidMount(){
    //firebase shit?
    //
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    const { userData, uid } = this.props.route.params;
    return (
      <GiftedChat
        isAnimated
        messages={this.state.messages}
        onSend={message => this.onSend (messages)}
        user={{
          _id: 1,//uid presumably
          name: 'lloyd',//get name from data?
        }}
      />
    );
  }
}

export default Channel