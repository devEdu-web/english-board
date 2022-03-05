import {UserProgress} from '../users/UserProgress.js'
import {User} from '../users/User.js'

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
        res.render('words-list', {userProgress, userName, userInfo})

    } catch(e) {
        res.status(500).json({errors: [{msg: error.message}]})
    }

}

async function getWordsInfo(req, res, next) {
    const {userId} = req.cookies
    const wordInfo = req.body
    const word = wordInfo.word
    const wordClass = wordInfo.wordClass

    try {

        await UserProgress.updateWordsInfo(userId, word, wordClass)
        res.redirect('/words/words-list')

    } catch(e) {
        res.status(500).json({errors: [{msg: error.message}]})
    }

}

export { getAddWordsPage, getWordsListPage, getWordsInfo };
