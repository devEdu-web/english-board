import {db} from '../config/database.js'
import * as wordModel from '../components/words/wordsModel.js'
import * as hourModel from '../components/hours/hoursModel.js'

async function getAllCollections () {

    const words = await wordModel.default.Word.getAllWords().toArray()
    const hours = await hourModel.default.Hour.getAllHourInfo().toArray()

    return {
        wordsCollection: words,
        hoursCollection: hours
    }

}

export {getAllCollections}