import Firebase from '../../config/Firebase'

class UserSingleton {
    db = Firebase.firestore()

    constructor() {
        this._user = null
    }

    async loadUser(uid) {
        
        const doc = await this.db.collection("users").doc(uid).get()
        console.log("retrieving user")
        if (doc.exists) {
            console.log('user exists')
            this._user = doc.data()
        } else {
            console.log('user does not exist')
        }
    }
}

const userInstance = new UserSingleton();
Object.freeze(userInstance);
export default userInstance;