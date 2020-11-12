import Firebase from '../../config/Firebase'
import "firebase/firestore";
import firebase from "firebase/app";


export class PreferenceProfiles {

     db = Firebase.firestore();

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
     addPreferenceProfile(courseName, availability, language, timezone, quiet,
                          timeOfDay) {
        var courseRef = this.db.collection("courses");
        var userID = "students." + Firebase.auth().currentUser.uid; 
        var preferences = this.createPreferences(availability, language, timezone, 
                                                 quiet, timeOfDay);
        var preferenceProfile = this.createPreferenceProifle(preferences); 

        if( courseName ) {
          courseRef.doc(courseName).update({[userID]:  preferenceProfile});
        }
        
    }

    /*
    * Creates preference profile of current user with given preferences
    * @param preferences - map of chosen preferences
    * @return preference profile map
    */ 
    createPreferenceProifle(preferences) {
        var preferenceProfle = {
            name: "Janeothy",
            profilePicture: "Image.png",
            bio: "So cool",
            endorsements: 1,
            preferences: preferences
        }

        return preferenceProfle; 
    }

    /*
    * Creates preferences map to be placed into a user's preference profile
    * @param availability - Days of week free
    * @param language - preferred language
    * @param timezone - where user lives
    * @param quiet - quiet or talkative study sessions
    * @param timeOfDay - the time a user can study
    * @return preferences map 
    */
    createPreferences(availability, language, timezone, quiet, timeOfDay) {
        var preferences = {
            availability: availability,
            language: language,
            timezone: timezone,
            quiet: quiet,
            timeOfDay: timeOfDay
        }

        return preferences; 
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