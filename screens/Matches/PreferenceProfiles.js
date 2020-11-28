import Firebase from '../../config/Firebase'
import "firebase/firestore";
import firebase from "firebase/app";
import userInstance from "../Singletons/UserSingleton";
import MatchingAlgorithm from "./MatchingAlgorithm"
import SavedData from "./SavedData"

export class PreferenceProfiles {
     db = Firebase.firestore();

     constructor() {
        this.preferences = {
            availability: {},
            language: "",
            timezone: "",
            quiet: false,
            remote: false
        };
        this.courseName = "";
     }

     /*  
     * Adds preference profile of current user to chosen course.
     */
     addPreferenceProfile() {
        var courseRef = this.db.collection("courses");
        var userID = "students." + Firebase.auth().currentUser.uid; 
        this.addLanguagePreference(); 
        var preferenceProfile = this.createPreferenceProifle(this.preferences); 

        console.log("Adding...")

       if( this.courseName ) {
          courseRef.doc(this.courseName).update({[userID]:  preferenceProfile});
          this.addCourseToUserArray();
        }
        
        console.log("done");
    }

    /** 
    * Adds the course name to the user's courses array 
    */
    addCourseToUserArray() {
        var courseRef = this.db.collection("users");
        var userID = Firebase.auth().currentUser.uid; 
        var userDoc = courseRef.doc(userID);
        userDoc.update({courses: firebase.firestore.FieldValue.arrayUnion(this.courseName)})
        this.addCourseToSingleton(); 
    }

    addCourseToSingleton() {
        userInstance._user.courses.push(this.courseName); 
    }

    /*
    * Adds the preference profile to the database and starts the algorithm to 
    * generate matches and goes the show matches.
    * @param props - used to get navigiate(), so user can see show matches screen
    */
   async addAndShow(props) {
        this.addPreferenceProfile(); 
        SavedData.changeTitle(this.courseName);
        MatchingAlgorithm.getStudentMap(this.courseName, 
            () => props.navigation.navigate("ShowMatches", {name: this.courseName}));
    }

    /** 
    * Creates preference profile of current user with given preferences
    * @param preferences - map of chosen preferences
    * @return preference profile map
    */ 
    createPreferenceProifle(preferences) {
      
       var userData = userInstance._user; 
       var name = userData.firstName + " " + userData.lastName; 
        var preferenceProfle = {
            name: name,
            bio: userData.bio,
            preferences: preferences
        }

        return preferenceProfle; 
    }

    /** *
    * Adds language to preference profile from singleton
    */ 
    addLanguagePreference() {
        this.preferences.language = userInstance._user.language; 
    }

    /**
     * Sets course from Courses.js
     * @param courseName - course where preferences will be added
     */
    addCourse(courseName) {
        this.courseName = courseName;
    }

    /**
     * Sets availability map from Availability.js
     * @param availability - user inputted availability map
     */
    addAvailability(availability) {
        this.preferences.availability = availability;
    }

    /**
     * Sets quiet preferences from Quiet.js
     * @param quiet - quiet preference 
     */
    addQuiet(quiet) {
        this.preferences.quiet = quiet; 
    }

    /**
     * Sets remote preference from Remote.js
     * @param remote - online/offline preference
     */
    addRemote(remote) {
        this.preferences.remote = remote;
    }

    //TESTING PURPOSES
    getPreferences() {
        return this.preferences;
    }

    /** 
    * Deletes preference profile of current user. 
    * @param courseName - the name of doc being updated
    */
    async deletePreferenceProfile(courseName) {
        var courseRef = this.db.collection("courses");
        var userID = "students." + Firebase.auth().currentUser.uid; 
        var userRef = this.db.collection("users");
        
        if( courseName ) {
            courseRef.doc(courseName).update(
               {[userID]: firebase.firestore.FieldValue.delete()});
            
            userRef.doc(Firebase.auth().currentUser.uid).update({
                courses: firebase.firestore.FieldValue.arrayRemove(courseName)
            });
            
            var courses =  userInstance._user.courses
            courses.splice(courses.indexOf(courseName),1);
            console.log(courses); 

        }

    }

    /**
     * Updates availability map in database for current user
     * @param availability - Edited availability map
     * @param courseName - Course name to access database
     */
    async editAvailability(availability,courseName) {
        var courseRef = this.db.collection("courses");
        var userID = "students." + Firebase.auth().currentUser.uid; 
        var key = userID + ".preferences.availability"
        if( courseName ) {
            courseRef.doc(courseName).update({[key]: availability}
            )
        }
    }

    /**
     * Updates quiet preference in database for current user
     * @param quiet - Edited quiet preference
     * @param courseName - Course name to access database
     */
    async editQuiet(quiet,courseName) {
        var courseRef = this.db.collection("courses");
        var userID = "students." + Firebase.auth().currentUser.uid; 
        var key = userID + ".preferences.quiet"
        if( courseName ) {
            courseRef.doc(courseName).update({[key]: quiet}
            )
        }
    }

    /**
     * Updates remote preference for current user
     * @param remote - Edited remote preference
     * @param courseName - Course name to access database   
     */
    async editRemote(remote,courseName) {
        var courseRef = this.db.collection("courses");
        var userID = "students." + Firebase.auth().currentUser.uid; 
        var key = userID + ".preferences.remote"
        if( courseName ) {
            courseRef.doc(courseName).update({[key]: remote}
            )
        }
    }
    
}

const preferenceProfiles = new PreferenceProfiles(); 
export default preferenceProfiles; 