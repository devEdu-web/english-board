import {db} from '../config/database.js'
import * as wordModel from '../components/words/wordsModel.js'
import * as hourModel from '../components/hours/hoursModel.js'
import * as getPercentage from '../util/getPercentage.js'

async function getAllCollections () {
    const words = await wordModel.default.Word.getAllWords().toArray()
    const hours = await hourModel.default.Hour.getAllHourInfo().toArray()
    const wordsInfo = await getPercentage.getClassesPercentage()
    // console.log(words.length)

    return {
        wordsCollection: words,
        hoursCollection: hours,
        wordsInfo: wordsInfo
    }
}
// Tu ta passando as horas num objeto tambem, agora arruma o dashboard

export {getAllCollections}