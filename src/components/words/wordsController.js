import wordModel from "./wordsModel.js";
import {UserProgress} from '../users/UserProgress.js'

async function getAddWordsPage(req, res, next) {
    const userId = req.cookies.userId
    const userName = req.cookies.userName
    const userProgress = await UserProgress.getUserProgress(userId)
    res.render("words", {userName, userProgress});
}

async function getWordsListPage(req, res, next) {
    const userName = req.cookies.userName
    try {
        const userId = req.cookies.userId
        const userProgress = await UserProgress.getUserProgress(userId)
    
        res.render('words-list', {userProgress, userName})

    } catch(e) {
        res.send(e)
    }

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
