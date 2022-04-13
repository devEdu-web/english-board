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
                $push: {"hours.hoursInfo": {[updatedHourInfo]: updatedCounter, hourInfoId: new ObjectId()}}
            }
        )
    }

    static updateWordsInfo(userId, word, wordClass) {

        return db.collection('userProgress').updateOne(
            {userId: new ObjectId(userId)},
            {
                $inc: {"words.wordsCounter": 1},
                $push: {"words.userWords": {wordName: word, wordClass, wordId: new ObjectId()}}
            }
        )

    }

    static getUserProgress(userId) {
        return db.collection('userProgress').findOne({userId: new ObjectId(userId)})
    }

    static deleteWord(userId, wordId) {
        return db.collection('userProgress').updateOne(
            {userId: new ObjectId(userId)},
            {
                $pull: {'words.userWords': {wordId: new ObjectId(wordId)}},
                $inc: {'words.wordsCounter': -1}
            }
        )
    }

    static deleteHour(userId, hourInfoId, amountDeleted) {
        return db.collection('userProgress').updateOne(
            {userId: new ObjectId(userId)},
            {
                $pull: {'hours.hoursInfo': {hourInfoId: new ObjectId(hourInfoId)}},
                $inc: {'hours.hoursCounter': -amountDeleted}
            }
        )
    }

}

export {UserProgress}