function hourValidation(req, res, next) {
    const {hourCounter, hourInfo} = req.body
    const errors = []
    
    if(hourCounter.length <= 0 || hourInfo.length <= 0) {
        errors.push('Please fill out every field')
    }

    if(errors.length <= 0) return next()

    res.status(400).json({errors})

}

export {hourValidation}