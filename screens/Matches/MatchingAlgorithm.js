import Firebase from '../../config/Firebase'
import "firebase/firestore";
import firebase from "firebase/app";

var PriorityQueue = require("js-priority-queue");

class MatchingAlgorithm {

    db = Firebase.firestore(); 
    queue =  new PriorityQueue({comparator: MaxComparator}); 

    constructor() {
        studentsMap = {}; 
        currentStudent = {}; 
    }

    /* 
    * Gets the student map from the course doc and calls functions that
    * will populate priority queue to retrieve top results.
    * @param courseName - name of course doc
    */ 
    async getStudentMap(courseName, showMatchesScreen) {
        const docRef = this.db.collection("courses").doc(courseName);
        const doc = await docRef.get();
      
        if(doc.exists) {
            console.log("Getting students...")
            this.studentsMap = doc.get("students");
            this.getCurrentStudent();
            this.orderStudents();
            showMatchesScreen();
        } else {
            console.log("Course does not exist.");
        }

    }

    /*
    * Retrieves current users preferences and info
    */ 
    getCurrentStudent() {
       var userID= Firebase.auth().currentUser.uid;
       this.currentStudent = this.studentsMap[userID]; 
    }


    /*
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

        if(preferences.timeOfDay === currentPref.timeOfDay) {
            tally++; 
        }

        if(preferences.timezone === currentPref.timezone) {
            tally++; 
        }

        var availability = preferences.availability; 
        var currentAvailibility = currentPref.availability;

        for(var [day,free] of Object.entries(availability)) {
            if( currentAvailibility[day] === free && free) tally++;
        }

        var queueInput = { student: student, tally: tally};
        this.queue.queue(queueInput);

    }

    /*
    * Tallies each student in that is in the student map and places them in PQ
    */ 
    orderStudents() {
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
const MaxComparator = function(student1, student2) 
    {return student2.tally - student1.tally}; 

const MA = new MatchingAlgorithm();
export default MA; 