import { ObjectId } from 'bson'
import {db} from '../../config/database.js'

class Hour {
    constructor(hoursCounter, hourInfo) {
        this.hoursCounter = hoursCounter,
        this.hoursInfo = hourInfo,
        this.getInfo = () => {return db.collection('hours').find().toArray()}
        this.save = async () => {
            const hours = await this.getInfo()
            if(hours.length > 0) {
                return db.collection("hours").updateOne(
                    {_id: ObjectId("619e64870c0b50cf202c271f")},
                    {
                        $inc: {hoursCounter: Number(this.hoursCounter)},
                        $push: {hoursInfo: this.hourInfo}
                    }
                )
            } else {
                return db.collection('hours').insertOne({hoursCounter: this.hoursCounter, hoursInfo: [this.hoursInfo]})
            }

            // Falta voce tratar do caso de não ter horas no dashboard

        }
    }



    static getAllHourInfo() {

        return db.collection('hours').find()

    }

}

export default {Hour}