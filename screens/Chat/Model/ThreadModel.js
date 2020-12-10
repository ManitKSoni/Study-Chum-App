
import Firebase from '../../../config/Firebase'

var firebase = require('firebase')


class ThreadModel {
    db = Firebase.firestore()
    uid = Firebase.auth().currentUser.uid

    constructor(channelID) {
        this.channelID = channelID
    }

    /**
     * Get a listener for all messages in a thread
     * @param {function} completion function that updates the UI based on new changes
     */
    threadListener(completion) {
        const thread = this.db.collection('chat').doc(this.channelID).collection('thread')
            .orderBy('createdAt', 'desc')
            //TODO: add a limit here so that we don't pull the whole chat then add some pagination

            const listener = thread.onSnapshot((snapshots) => {
                let messages = []
                snapshots.docChanges().forEach(change => {
                    switch(change.type) {
                        case "added":
                            let message = change.doc.data()
                            message['chatID'] = change.doc.id
                            messages.push(message)
                    }
                })
                completion(messages)
            })
            return listener
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
}

export default ThreadModel;