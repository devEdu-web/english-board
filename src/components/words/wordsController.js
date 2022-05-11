import {UserProgress} from '../users/UserProgress.js'
import {User} from '../users/User.js'
import {validationResult} from 'express-validator'

async function getAddWordsPage(req, res, next) {
    const {userId, userName} = req.cookies

    try {
        const userProgress = await UserProgress.getUserProgress(userId)
        const userInfo = await User.findUserById(userId)
        res.render("words", {userName, userProgress, userInfo});
    } catch(error) {
        res.status(500).json({errors: [{msg: error.message}]})
    }
}

async function getWordsListPage(req, res, next) {
    const {userName, userId} = req.cookies

    try {
        
        const userProgress = await UserProgress.getUserProgress(userId)
        const userInfo = await User.findUserById(userId)
        console.dir(userProgress, {depth: null})
        res.render('words-list', {userProgress, userName, userInfo})

    } catch(error) {
        res.status(500).json({errors: [{msg: error.message}]})
    }

}

async function addNewWord(req, res, next) {
    const {userId} = req.cookies
    const wordInfo = req.body
    const word = wordInfo.word
    const wordClass = wordInfo.wordClass
    const errors = validationResult(req)
    if(errors.errors.length > 0) return res.status(400).json(errors) 

    try {

        await UserProgress.updateWordsInfo(userId, word, wordClass)
        res.redirect('/words/words-list')

    } catch(error) {
        res.status(500).json({errors: [{msg: error.message}]})
    }

}

async function deleteWord(req, res, next) {
    const {id: wordId} = req.params
    const {userId} = req.cookies

    try {
        await UserProgress.deleteWord(userId, wordId)
        res.sendStatus(200)
    } catch(error) {
        res.sendStatus(404)
    }

}

export { getAddWordsPage, getWordsListPage, addNewWord, deleteWord };
