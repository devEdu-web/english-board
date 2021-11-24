import { ObjectId } from 'bson'
import {db} from '../../config/database.js'

class Hour {
    constructor(hoursCounter, hourInfo) {
        this.hoursCounter = hoursCounter,
        this.hourInfo = hourInfo,
        this.save = () => {
            return db.collection("hours").updateOne(
                {_id: ObjectId("619e64870c0b50cf202c271f")},
                {
                    $inc: {hoursCounter: Number(this.hoursCounter)},
                    $push: {hoursInfo: this.hourInfo}
                }
            )
        }
    }

    static getAllHourInfo() {

        return db.collection('hours').find()

    }

}

export default {Hour}