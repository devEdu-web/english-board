import hoursModel from './hoursModel.js'
import hourModel from './hoursModel.js'
import {UserProgress} from '../users/UserProgress.js'

function getAddHourRegisterPage(req, res, next) {
    res.render('hours')
} 

function getHoursRegisterPage(req, res, next) {
    const hours = hourModel.Hour.getAllHourInfo()
    hours.toArray()
    .then(hours => {
        // console.log(hours)
        res.render('hours-register', {allHours: hours})
    })
    .catch(hours)

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