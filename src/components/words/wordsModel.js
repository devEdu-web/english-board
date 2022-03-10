// import * as database from "../../config/database.js";
import {db} from '../../config/database.js'

class Word {
    constructor(wordName, wordClass) {
        this.wordName = wordName, 
        this.wordClass = wordClass,
        this.save = () => {
            return db.collection("words-list").insertOne(this);  
        }
    }

    static getAllWords() {
        return db.collection("words-list").find()
    }
}

export default { Word };
