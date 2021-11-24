import hourModel from './hoursModel.js'

function getAddHourRegisterPage(req, res, next) {
    res.render('hours')
} 

function getHoursRegisterPage(req, res, next) {
    res.render('hours-register')
}

function postHour(req, res, next) {
    const hourCounter = req.body.hourCounter
    const hourInfo = req.body.hourInfo

    const hour = new hourModel.Hour(hourCounter, {[hourInfo]: hourCounter})
    console.log(hour)
    hour.save()
    .then(result => {
        res.redirect('/hours/hours-register')
    })
    .catch(err => console.log(err))
    

}

export {getAddHourRegisterPage, getHoursRegisterPage, postHour}