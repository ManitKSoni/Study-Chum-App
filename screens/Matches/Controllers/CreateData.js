import UserSingleton from "../../Singletons/UserSingleton";
import MatchingAlgorithm from "./MatchingAlgorithm";
import {getImage} from "../Models/GetImage"


/**
 * Retrieves all classes from the User Singleton
 */
export function createDrawerData() {
    var data = [];
    //Will have to get data from database to display when updated or add to singleton maybe
    var courses = UserSingleton._user.courses;
    let unique = courses.filter((c, index) => {
        return courses.indexOf(c) === index;
    });

    unique.sort();
    for (var i = 0; i < unique.length; i++) {
        var currData = {
            id: i.toString(),
            course: unique[i]
        };
        data.push(currData);
    }

    return data;
}


/**
 * Gets all data from PQ from MatchingAlgorithm for each user in courses 
 * database
 */
export async function createMatchesData() {
    var pq = MatchingAlgorithm.queue;
    var data = []
    var count = 0;
    while (pq.length != 0) {
        var currStudent = pq.dequeue();
        var URI = await getImage(currStudent.userID)
        var currData = {
            id: count.toString(),
            userID: currStudent.userID, //use to go to user profile
            name: currStudent.student.name,
            bio: currStudent.student.bio,
            uri: URI,
            tally: currStudent.tally,
        };
        count++;
        data.push(currData);
    }
    
    return data; 
};