import Firebase from '../../../config/Firebase';
/**
 * Retrieves image of users in current course's database
 * @param userID - The image ID to retrieve from firebase storage
 */
export async function getImage(userID) {

    var storage = Firebase.storage();
    var imagePath = storage.ref('images/' + userID);
    var imageURI = null
    try{
        imageURI = await imagePath.getDownloadURL(); 

    } catch(err) {
        console.log("No image on database")
        imageURI = null;
    }

    return imageURI; 
}