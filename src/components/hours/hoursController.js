import {UserProgress} from '../users/UserProgress.js'
import {User} from '../users/User.js'

async function getAddHourRegisterPage(req, res, next) {
    const userId = req.cookies.userId
    const userProgress = await UserProgress.getUserProgress(userId)
    const userName = req.cookies.userName
    const userInfo = await User.findUserById(userId)
    res.render('hours', {userName, userProgress, userInfo})
} 

async function getHoursRegisterPage(req, res, next) {
    const userName = req.cookies.userName
    try {
        const userId = req.cookies.userId
        const userProgress = await UserProgress.getUserProgress(userId)
        const userInfo = await User.findUserById(userId)
        res.render('hours-register', {userProgress, userName, userInfo})

    } catch(e) {
        res.send(e)
    }
    
}

async function postHour(req, res, next) {

    try {   
        const userId = req.cookies.userId
        const hourCounter = Number(req.body.hourCounter)
        const hourInfo = req.body.hourInfo
    
        await UserProgress.updateHoursInfo(userId, hourCounter, hourInfo)
    
        res.redirect('/hours/hours-register')

    } catch(e) {
        res.send(e)
    }    

}

export {getAddHourRegisterPage, getHoursRegisterPage, postHour};