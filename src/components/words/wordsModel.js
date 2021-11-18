// import * as database from "../../config/database.js";
import {getDb} from '../../config/database.js'

class Word {
    constructor(wordName, wordClass) {
        this.wordName = wordName, 
        this.wordClass = wordClass,
        this.save = () => {
            const db = getDb()
            return db.collection("words-list").insertOne(this);  
        }
    }

    static getAllWords() {
        const db = getDb()

        return db.collection("words-list").find()


    }
}

export default { Word };
