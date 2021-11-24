import {db} from '../config/database.js'
import * as wordModel from '../components/words/wordsModel.js'

function getAllCollections () {
    const collections = wordModel.default.Word.getAllWords()
    .toArray()
    .then(words => {

        return {
            wordsCollection: words
        }

    })
    .catch(err => console.log(err))
    

    return collections

}

export {getAllCollections}