import wordModel from "./wordsModel.js";
import {UserProgress} from '../users/UserProgress.js'

function getAddWordsPage(req, res, next) {
    res.render("words");
}

async function getWordsListPage(req, res, next) {

    try {
        const userId = req.cookies.userId
        const userProgress = await UserProgress.getUserProgress(userId)
    
        res.render('words-list', {userProgress})

    } catch(e) {
        res.send(e)
    }



    // const allWords = wordModel.Word.getAllWords()
    // allWords.toArray()
    // .then(words => {
    //     console.log(words)
    //     res.render("words-list", {allWords: words});
    // })
    // .catch(err => console.log(err))
}

async function getWordsInfo(req, res, next) {

    try {
        const userId = req.cookies.userId
        const wordInfo = req.body
        const word = wordInfo.word
        const wordClass = wordInfo.wordClass
    
        await UserProgress.updateWordsInfo(userId, word, wordClass)
    
        res.redirect('/words/words-list')

    } catch(e) {
        res.send(e)
    }

}

export { getAddWordsPage, getWordsListPage, getWordsInfo };
