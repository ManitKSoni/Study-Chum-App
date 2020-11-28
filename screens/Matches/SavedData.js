import Firebase from '../../config/Firebase'
import "firebase/firestore";
class SavedData {
    constructor(){
        this.title = "";
        this.profile = {}
    }

    changeTitle(courseName) {
        this.title = courseName; 
    }

    setProfile(preferences) {
        this.profile = preferences; 
    }

    async renderProfile(uid, goToUserProfile) {
        const db = Firebase.firestore(); 
        const usersRef = db.collection("users").doc(uid);
        const user = await usersRef.get();
        if(user.exists) {
            console.log("Getting user profile...");
            this.profile = user.data();
            goToUserProfile();
        } else {
            console.log("user does not exist")
        }
        console.log("Done");
    }


}

const SD = new SavedData();
export default SD;