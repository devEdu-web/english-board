import { ObjectId } from 'bson'
import {db} from '../../config/database.js'

class Hour {
    constructor(hoursCounter, hourInfo) {
        this.hoursCounter = hoursCounter,
        this.hoursInfo = hourInfo,
        this.getInfo = () => {return db.collection('hours').find().toArray()}
        this.save = async () => {
            const hours = await this.getInfo()
            const hoursId = ObjectId(hours[0]._id).toString()
            if(hours.length > 0) {
                return db.collection("hours").updateOne(
                    {_id: ObjectId(hoursId)},
                    {
                        $inc: {hoursCounter: Number(this.hoursCounter)},
                        $push: {hoursInfo: this.hoursInfo}
                    }
                )
            } else {
                return db.collection('hours').insertOne({hoursCounter: this.hoursCounter, hoursInfo: [this.hoursInfo]})
            }


        }
    }



    static getAllHourInfo() {

        return db.collection('hours').find()

    }

}

export default {Hour}