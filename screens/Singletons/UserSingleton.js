import Firebase from '../../config/Firebase'

class UserSingleton {
    db = Firebase.firestore()

    constructor() {
        this._user = null
    }

    async loadUser(uid, completion) {
        
        const doc = await this.db.collection("users").doc(uid).get()
        console.log("retrieving user")
        if (doc.exists) {
            console.log('user exists')
            this._user = doc.data()
            completion(true)
        } else {
            console.log('user does not exist')
            completion(false)
        }
    }

    async createUser(user, completion) {
        console.log(user)
        let uid = Firebase.auth().currentUser.uid
        this.db.collection("users").doc(uid).set(user)
            .then(() => {
                completion()
            })
            .catch(error => {
                console.log(error)
            })
        this._user = user
        
    }
}

const userInstance = new UserSingleton();
Object.freeze(userInstance);
export default userInstance;