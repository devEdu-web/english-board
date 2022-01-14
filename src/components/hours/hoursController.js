import hoursModel from './hoursModel.js'
import hourModel from './hoursModel.js'

function getAddHourRegisterPage(req, res, next) {
    res.render('hours')
} 

function getHoursRegisterPage(req, res, next) {
    const hours = hourModel.Hour.getAllHourInfo()
    hours.toArray()
    .then(hours => {
        console.log(hours)
        res.render('hours-register', {allHours: hours})
    })
    .catch(hours)

}

function postHour(req, res, next) {
    const hourCounter = req.body.hourCounter
    const hourInfo = req.body.hourInfo
    const hours = hourModel.Hour.getAllHourInfo()

    const hour = new hourModel.Hour(hourCounter, {[hourInfo]: hourCounter})
    // console.log(hour)
    hour.save()
    .then(result => {
        console.log(result)
        res.redirect('/hours/hours-register')
    })
    .catch(err => console.log(err))
    

}

export {getAddHourRegisterPage, getHoursRegisterPage, postHour}