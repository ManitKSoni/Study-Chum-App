import userInstance from "../../Singletons/UserSingleton";
import MatchingAlgorithm from "./MatchingAlgorithm"
import SavedData from "./SavedData"
import CoursesCollectionAccess from "../Models/CoursesCollectionAccess"


/**
 * Controller to add Preference Profiles to database
 */
export class PreferenceProfiles {

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

    /** 
    * Adds the preference profile to the database and starts the algorithm to 
    * generate matches and goes the show matches.
    * @param props - used to get navigiate(), so user can see show matches screen
    */
    async addAndShow(props) {
        this.addLanguagePreference();
        this.addTimezonePreference();
        var preferences = this.createPreferenceProifle(this.preferences)
        await CoursesCollectionAccess.addPreferenceProfile(preferences, this.courseName); 
        SavedData.changeTitle(this.courseName);
        MatchingAlgorithm.getStudentMap(this.courseName, 
        () => props.navigation.navigate("ShowMatches", {name: this.courseName}));
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: true
        });
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

    /**
     * Deletes preference profile in chosen course
     * @param courseName - course being deleted
     */
    deletePreferenceProfile(courseName) {
        CoursesCollectionAccess.deletePreferenceProfile(courseName);
    }

    /**
     * Updates availability map in database for current user
     * @param availability - Edited availability map
     * @param courseName - Course name to access database
     */
    async editAvailability(availability,courseName) {
      CoursesCollectionAccess.editAvailability(availability,courseName);
    }

    /**
     * Updates quiet preference in database for current user
     * @param quiet - Edited quiet preference
     * @param courseName - Course name to access database
     */
    async editQuiet(quiet,courseName) {
        CoursesCollectionAccess.editQuiet(quiet,courseName);
    }

     /**
     * Updates remote preference for current user
     * @param remote - Edited remote preference
     * @param courseName - Course name to access database   
     */
    async editRemote(remote,courseName) {
        CoursesCollectionAccess.editRemote(remote, courseName);
    }

    /** 
    * Adds language to preference profile from singleton
    */ 
    addLanguagePreference() {
        this.preferences.language = userInstance._user.language; 
    }

    /**
     * Adds timezone to preference profile from singleton
     */
    addTimezonePreference() {
        this.preferences.timezone = userInstance._user.timezone; 
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
    
}

const preferenceProfiles = new PreferenceProfiles(); 
export default preferenceProfiles; 