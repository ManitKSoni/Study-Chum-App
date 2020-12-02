import Firebase from '../../../config/Firebase'
import "firebase/firestore";
import firebase from "firebase/app";
import userInstance from "../../Singletons/UserSingleton";

export class CoursesCollectionAccess {

    db = Firebase.firestore();

     /*  
     * Adds preference profile of current user to chosen course.
     */
    async addPreferenceProfile(preferences, courseName) {
      
        var courseRef = this.db.collection("courses");
        var userID = "students." + Firebase.auth().currentUser.uid; 

        console.log("Adding...")

       if( courseName ) {
          courseRef.doc(courseName).update({[userID]:  preferences});
          this.addCourseToUserArray(courseName);
        }
        
        console.log("done");
    }

    /** 
    * Adds the course name to the user's courses array 
    */
    addCourseToUserArray(courseName) {
        var courseRef = this.db.collection("users");
        var userID = Firebase.auth().currentUser.uid; 
        var userDoc = courseRef.doc(userID);
        userDoc.update({courses: firebase.firestore.FieldValue.arrayUnion(courseName)})
        this.addCourseToSingleton(courseName); 
    }

    addCourseToSingleton(courseName) {
        if( !userInstance._user.courses.includes(courseName)) {
            userInstance._user.courses.push(courseName); 
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

    /* Code above deals with PreferenceProfiles.js*/
    
    /* Code below deals with MatchingAlogrithm.js */

    /**  
    * Gets the student map from the course doc and calls functions that
    * will populate priority queue to retrieve top results.
    * @param courseName - name of course doc
    */ 
    async getStudentMap(courseName) {
        const docRef = this.db.collection("courses").doc(courseName);
        const doc = await docRef.get();

        if(doc.exists) {
            console.log("Getting students...")
            var studentsMap = doc.get("students");
            return studentsMap; 
        } else {
            console.log("Course does not exist.");
            return null; 
        }

    }


}

const cca = new CoursesCollectionAccess();
export default cca; 

