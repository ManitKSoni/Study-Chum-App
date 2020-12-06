import Firebase from '../../../config/Firebase'
import "firebase/firestore";
class SavedData {

    constructor(){
        this.title = ""; // current class 
        this.profile = {}, // OTHER USERS PROFILE
        this.preferences = {} // SPAGHETTI CODE: CURRENT USERS PROFILE
        this.preferences2 = {}; 
    }

    changeTitle(courseName) {
        this.title = courseName; 
    }

    //CALLED IN MATCHING ALGORITHM IN GET CURRENT STUDENT
    setPreferences(preferences) {
        this.preferences = preferences; 
    }

    setPreferences2(preferences) {
        this.preferences2 = preferences; 
    }

    /**
     * Renders the pressed users profile from ShowMatches.js
     * @param uid - the uid of the pressed user
     * @param goToUserProfile - callback to go to UserProfile.js
     */
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