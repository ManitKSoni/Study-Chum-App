class SavedData {
    constructor(){
        this.title = "";
    }

    changeTitle(courseName) {
        this.title = courseName; 
    }
}

const SD = new SavedData();
export default SD;