function getAddHourRegisterPage(req, res, next) {
    res.render('hours')
} 

function getHoursRegisterPage(req, res, next) {
    res.render('hours-register')
}

export {getAddHourRegisterPage, getHoursRegisterPage}