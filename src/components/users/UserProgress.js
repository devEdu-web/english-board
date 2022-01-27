import { ObjectId } from 'mongodb'
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

    static updateHoursInfo(userId, updatedCounter, updatedHourInfo) {
        return db.collection('userProgress').updateOne(
            {userId: new ObjectId(userId)},
            {
                $inc: {"hours.hoursCounter": Number(updatedCounter)},
                $push: {"hours.hoursInfo": {[updatedHourInfo]: updatedCounter}}
            }
        )
    }

    static updateWordsInfo(userId) {}

    static getUserProgress(userId) {

    }
}

export {UserProgress}