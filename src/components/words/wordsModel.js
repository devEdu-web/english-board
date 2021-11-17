// import * as database from "../../config/database.js";
import {getDb} from '../../config/database.js'

class Word {
    constructor(wordName, wordClass) {
        this.wordName = wordName, 
        this.wordClass = wordClass,
        this.save = () => {
            const teste = getDb()
            return teste.collection("words-list").insertOne(this);  
        }
    }

    static save() {
        const db = database.getDb(); // here returns the database
        return db.collection("words-list").insertOne({ teste: "nada" });
    }
}

export default { Word };
