import {db} from '../../config/database.js'

class UserProgress {
    constructor(userId, words, hours) {
        this.userId = userId,
        this.words = words,
        this.hours = hours,
        this.save = async () => {
            return db.collection('userProgress').insertOne(this)
        }
    }
}

export {UserProgress}