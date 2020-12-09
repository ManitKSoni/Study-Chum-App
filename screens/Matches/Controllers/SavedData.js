import Firebase from '../../../config/Firebase'
import "firebase/firestore";
class SavedData {

    constructor(){
        this.title = ""; // current course name 
        this.profile = {}, // OTHER USERS PROFILE
        this.preferences = {} // CURRENT USERS PROFILE PREFERENCES
        this.preferences2 = {}; //backup preferences when creating class profile
    }

    /**
     * Sets the title of current course selected
     * @param courseName - name of course pressed on
     */
    changeTitle(courseName) {
        this.title = courseName; 
    }

    /**
     * CALLED IN MATCHING ALGORITHM IN GET CURRENT STUDENT
     * to set preferences of current user
     * @param - preferences of current user and course name
     */ 
    setPreferences(preferences) {
        this.preferences = preferences; 
    }

    /**
     * Sets up backup preferences when creating classes 
     * @param preferences - preferences of current user and course name
     */
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