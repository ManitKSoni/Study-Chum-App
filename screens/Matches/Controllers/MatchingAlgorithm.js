import Firebase from '../../../config/Firebase'
import SavedData from "./SavedData";
import CoursesCollectionAccess from "../Models/CoursesCollectionAccess";

var PriorityQueue = require("js-priority-queue");

/**
 * Controller to process data of users through their preferences
 */
class MatchingAlgorithm {

    queue =  new PriorityQueue({comparator: MaxComparator}); 

    constructor() {
        studentsMap = {}; 
        currentStudent = {}; 
    }

    /**  
    * Gets the student map from the course doc and calls functions that
    * will populate priority queue to retrieve top results.
    * @param courseName - name of course doc
    */ 
    async getStudentMap(courseName, showMatchesScreen) {
        this.studentsMap = await CoursesCollectionAccess.getStudentMap(courseName)
        if( this.studentsMap) {
            console.log("Retrieved student map")
            this.getCurrentStudent();
            this.orderStudents();
            showMatchesScreen();

        } else {
            console.log("Failed to retrieve student map")
        }
        
    }

    /** 
    * Retrieves current users preferences and info
    */ 
    async getCurrentStudent() {
       var userID = Firebase.auth().currentUser.uid;
       this.currentStudent = this.studentsMap[userID]; 
       if(this.currentStudent) {
        SavedData.setPreferences(this.currentStudent.preferences);
       } else {
        console.log("RACE CONDITION DETECTED. BACKUP GIVEN")
        SavedData.setPreferences( SavedData.preferences2 );
        }
    }


    /** 
    * Tallies preferences of other users that are the same as current user
    * @param userID - the userID of preference profile
    * @param student - the student map containing preferences
    */ 
    tallyPreferences(userID, student) {
        
        if(userID == Firebase.auth().currentUser.uid) return; 

        var tally = 0; 
        var preferences = student.preferences;
        var currentPref = this.currentStudent.preferences;
        
        if(preferences.language === currentPref.language) {
            tally++; 
        }

        if(preferences.quiet === currentPref.quiet) {
            tally++; 
        }
        
        if(preferences.timezone === currentPref.timezone) {
            tally++; 
        }

        if(preferences.remote === currentPref.remote) {
            tally++; 
        } 

        var availability = preferences.availability; 
        var currentAvailibility = currentPref.availability;

        for(var [day,free] of Object.entries(availability)) {
            if( currentAvailibility[day] === free && free) tally++;
        }

        var queueInput = { student: student, userID: userID, tally: tally};
        this.queue.queue(queueInput);

    }

    /** 
    * Tallies each student in that is in the student map and places them in PQ
    */ 
    orderStudents() {
       this.queue.clear(); 
       for( var [key,value] of Object.entries(this.studentsMap)) {
           this.tallyPreferences(key, value);
       }
    }

    /*
    * Prints every student in PQ
    */
    test() {
        while(this.queue.length != 0) {
            console.log(this.queue.dequeue().student.name);
        }
    }
    

}

// Comparator to create a Max Heap
const MaxComparator = function(student1, student2) {
    // If tallies are the same, put in alphabetical order
    if(student1.tally === student2.tally) {
        return student1.student.name.localeCompare(student2.student.name);
    }
    return student2.tally - student1.tally
}; 

const MA = new MatchingAlgorithm();
export default MA; 