
import Firebase from '../../config/Firebase'
import userInstance from '../Singletons/UserSingleton'

var firebase = require('firebase')


class ThreadModel {
    db = Firebase.firestore()
    uid = Firebase.auth().currentUser.uid
    messages = []

    constructor(otherUserID, channelID) {
        this.otherUserID = otherUserID
        this.channelID = channelID
    }

    /**
     * Get a listener for all messages in a thread
     * @param {function} completion function that updates the UI based on new changes
     */
    async threadListener(completion) {
        const thread = this.db.collection('chat').doc(this.channelID).collection('thread')
            .orderBy('createdAt', 'desc')
            //TODO: add a limit here so that we don't pull the whole chat then add some pagination

        let listener = await thread.onSnapshot((snapshots) => {
            this.messages = []
            snapshots.forEach((doc) => {
                let message = doc.data()
                message['chatID'] = doc.id
                this.messages.push(message)
            })
            completion(this.messages)
        })
        return listener // Call this to stop the listener 
    }

    /**
     * Creates a new message in a channel
     * @param {object} message 
     */
    sendMessage(message) {

        // Updates the thread
        this.db.collection('chat').doc(this.channelID).collection('thread').doc(message._id).set(message)

        let isReadKey = `${this.uid}.isRead`
        // Updates the channel
        this.db.collection('chat').doc(this.channelID).update({
            lastTimestamp: message.createdAt, 
            lastSentMessage: message.text,
            lastSender: this.uid,
            [isReadKey]: false
        })
    }

    /**
     * Get all messages in the thread for a channel
     * @param {string} channelID ID of channel
     * @deprecated
     */
    async getThread(channelID) {
        let query = this.db.collection('chat').doc(channelID).collection('thread')
            .orderBy("timestamp")
            
        let snapshot = await query.get()
        snapshot.forEach((doc) => {
            console.log(`${doc.data().sender}: ${doc.data().message}`)
        })
    }
}

export default ThreadModel;