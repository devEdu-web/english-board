import {db} from '../config/database.js'
import * as wordModel from '../components/words/wordsModel.js'

function getAllCollections () {
    let wordsToArray = []
    let hoursToArray;
    const collections = {
        wordsCollection: null,
        hoursCollection: null
    }

    collections.wordsCollection = wordModel.default.Word.getAllWords()

    const teste = wordModel.default.Word.getAllWords()
    .toArray()
    .then(words => {

        return {
            wordsCollection: words
        }

    })
    .catch(err => console.log(err))
    
    // collections.wordsCollection = word

    return teste

}

export {getAllCollections}