
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

    /**
     * Get a listener for all messages in a thread
     * @param {string} channelID ID of channel
     * @param {function} completion function that updates the UI based on new changes
     */
    async threadListener(channelID, completion) {
        const thread = this.db.collection('chat').doc(channelID).collection('thread')
            .orderBy('timestamp', 'desc')
            //TODO: add a limit here so that we don't pull the whole chat then add some pagination

        let listener = await thread.onSnapshot((snapshots) => {
            snapshots.forEach((doc) => {
                this.messages.push(doc.data())
            })
            completion(this.messages)
        })
        return listener // Call this to stop the listener 
    }

    /**
     * Creates a new message in a channel
     * @param {string} message message to be sent
     * @param {string} channelID ID of channel
     */
    sendMessage(message, channelID) {

        // Updates the thread
        this.db.collection('chat').doc(channelID).collection('thread').add({
            message: message,
            sender: this.uid, 
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        let isReadKey = `${this.uid}.isRead`
        // Updates the channel
        this.db.collection('chat').doc(channelID).update({
            lastTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
            lastSentMessage: message,
            lastSender: this.uid,
            [isReadKey]: false
        })
    }
}

export default ThreadModel;