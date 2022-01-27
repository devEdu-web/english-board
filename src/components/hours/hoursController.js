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
    const userId = req.cookies.userId
    const hourCounter = Number(req.body.hourCounter)
    const hourInfo = req.body.hourInfo
    const hours = hourModel.Hour.getAllHourInfo()

    await UserProgress.updateHoursInfo(userId, hourCounter, hourInfo)

    console.log('done')

    // const hour = new hourModel.Hour(hourCounter, {[hourInfo]: hourCounter})
    // console.log(hour)
    // hour.save()
    // .then(result => {
    //     // console.log(result)
    //     res.redirect('/hours/hours-register')
    // })
    // .catch(err => console.log(err))
    

}

export {getAddHourRegisterPage, getHoursRegisterPage, postHour};