import hoursModel from './hoursModel.js'
import hourModel from './hoursModel.js'
import {UserProgress} from '../users/UserProgress.js'

async function getAddHourRegisterPage(req, res, next) {
    const userId = req.cookies.userId
    const userProgress = await UserProgress.getUserProgress(userId)
    const userName = req.cookies.userName
    res.render('hours', {userName, userProgress})
} 

async function getHoursRegisterPage(req, res, next) {
    const userName = req.cookies.userName
    try {
        const userId = req.cookies.userId
        const userProgress = await UserProgress.getUserProgress(userId)

        res.render('hours-register', {userProgress, userName})

    } catch(e) {
        res.send(e)
    }
    
}

async function postHour(req, res, next) {

    try {   
        const userId = req.cookies.userId
        const hourCounter = Number(req.body.hourCounter)
        const hourInfo = req.body.hourInfo
        const hours = hourModel.Hour.getAllHourInfo()
    
        await UserProgress.updateHoursInfo(userId, hourCounter, hourInfo)
    
        res.redirect('/hours/hours-register')

    } catch(e) {
        res.send(e)
    }    

}

export {getAddHourRegisterPage, getHoursRegisterPage, postHour};