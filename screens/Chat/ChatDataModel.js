import Firebase from '../../config/Firebase'
import userInstance from '../Singletons/UserSingleton'

var firebase = require('firebase')


class ChatDataModel {
    db = Firebase.firestore()
    uid = Firebase.auth().currentUser.uid
    channels = []

    /**
     * Creates a new listener for chats
     * @param {function} completion function called after new messages
     */
    newChatListener(completion) {
        const query = this.db.collection('chat')
            .where('users', 'array-contains', this.uid)
            .orderBy('lastTimestamp')

        query.onSnapshot((snapshots) => {
            snapshots.docChanges().forEach(change => {
                switch (change.type) {
                    case "added": // When a new channel is created 
                        let json = change.doc.data()
                        json['channelID'] = change.doc.id
                        this.channels.unshift(json)
                        break;
                    case "modified": // When someone messages
                        let id = change.doc.id
                        let index = 0
                        let newChannel = null
                        this.channels.forEach((channel, i) => {
                            if (channel.channelID === id) {
                                index = i
                                newChannel = channel
                            }
                        })
                        this.channels.splice(index, 1)
                        newChannel.lastSentMessage = change.doc.get('lastSentMessage')
                        newChannel.lastTimestamp = change.doc.get('lastTimestamp')
                        newChannel.lastSender = change.doc.get('lastSender')
                        this.channels.unshift(newChannel)
                        break;
                    default:
                        console.log("Something went wrong")
                        break;
                }
            })
            completion(this.channels)
        })
    }

    /**
     * Looks for a certain channel and if it doesn't exist, creates one
     * @param {string} otherUserID ID of other user
     */
    async getChannel(otherUserID, otherUserName, completion) {
        let uid = this.uid + '.name'
        const query = this.db.collection('chat')
            .where('users', 'array-contains', this.uid)
            .where(uid, '==', otherUserName)

        let snapshot = await query.get()
        if (snapshot.empty) {
            console.log("channel created")
            this.createChannel(otherUserID, otherUserName, completion)
        } else {
            completion(snapshot.docs[0].id)
        }
    }

    /**
     * Creates a new channel 
     * @param {string} otherUserID ID of other user
     * @param {string} otherUserName name of other user
     */
    async createChannel(otherUserID, otherUserName, completion) {

        let docRef = await this.db.collection('chat').add({
            users: [
                otherUserID, this.uid
            ], // TODO: fill in real info
            [this.uid]: {
                name: otherUserName,
                picture: 'pictureLink.jpg',
                isRead: false
            },
            [otherUserID]: {
                name: `${userInstance._user.firstName} ${userInstance._user.lastName}`,
                picture: 'pictureLink.jpg',
                isRead: false
            },
            lastTimestamp: "",
            lastSentMessage: "",
            lastSender: ""
        })
        console.log(`Channel id: ${docRef.id}`)
        completion(docRef.id)
    }
}

export default ChatDataModel