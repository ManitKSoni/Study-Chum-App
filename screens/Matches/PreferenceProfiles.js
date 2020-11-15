import Firebase from '../../config/Firebase'
import "firebase/firestore";
import firebase from "firebase/app";
import userInstance from "../Singletons/UserSingleton";

export class PreferenceProfiles {
     db = Firebase.firestore();

     constructor() {
        this.preferences = {
            availability: {},
            language: "",
            timezone: "",
            quiet: "",
            timeOfDay: ""
        };
        this.courseName = "";
     }

      /*TODO 
          * Make a search function to get exact name of course to stop errors
          * Get data from profile to get name, profilePicture, bio, endorsements
        */ 
     /*  
     * Adds preference profile of current user to chosen course.
     * @param courseName - The name of course being updated
     * @param availability - Days of week free
     * @param language - preferred language
     * @param timezone - where user lives
     * @param quiet - quiet or talkative study sessions
     * @param timeOfDay - the time a user can study
     */
     addPreferenceProfile() {
        var courseRef = this.db.collection("courses");
        var userID = "students." + Firebase.auth().currentUser.uid; 
        var preferenceProfile = this.createPreferenceProifle(this.preferences); 

        console.log("Adding...")

       if( this.courseName ) {
          courseRef.doc(this.courseName).update({[userID]:  preferenceProfile});
        }
        
        console.log("done...");
    }

    /*
    * Creates preference profile of current user with given preferences
    * @param preferences - map of chosen preferences
    * @return preference profile map
    */ 
    createPreferenceProifle(preferences) {
      
       var userData = userInstance._user; 
        var preferenceProfle = {
            name: userData.name,
            profilePicture: "Image.png",
            bio: "So cool",
            endorsements: 1,
            preferences: preferences
        }

        return preferenceProfle; 
    }

    addCourse(courseName) {
        this.courseName = courseName;
    }

    addAvailability(availability) {
        this.preferences.availability = availability;
    }

    addTimezone(timezone) {
        this.preferences.timezone = timezone; 
    }

    addTimeOfDay(timeOfDay) {
        this.preferences.timeOfDay = timeOfDay; 
    }

    addLanguage(language) {
        this.preferences.language = language; 
    }

    addQuiet(quiet) {
        this.preferences.quiet = quiet; 
    }

    //TESTING PURPOSES
    getPreferences() {
        return this.preferences;
    }

    /*
    * Deletes preference profile of current user. 
    * @param courseName - the name of doc being updated
    */
    deletePreferenceProfile(courseName) {
        var courseRef = this.db.collection("courses");
        var userID = "students." + Firebase.auth().currentUser.uid; 
        
        if( courseName ) {
           var deletedPreferenceProfile = courseRef.doc(courseName).update(
               {[userID]: firebase.firestore.FieldValue.delete()})
        }
    }
    
}

const preferenceProfiles = new PreferenceProfiles(); 
export default preferenceProfiles; 