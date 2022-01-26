function registerValidation(req, res, next) {
    const errors = []
    const {name, email, password, confirmPassword} = req.body
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    if(name.length < 3) {
        errors.push({field: 'name', message: 'Name must have 3 characteres'})
    }

    if(!email.toString().match(regex)) {
        errors.push({field: 'email', message: 'Email invalid'})
    }

    if(password.length < 6) {
        errors.push({field: 'password', message: 'Password must have 6 characteres'})
    }

    if(password !== confirmPassword) {
        errors.push({field: 'confirmPassword', message: 'Passwords dont match'})
    }


    if(errors.length <= 0) return next()

    // TODO: Treat and send properly the errors to the user and improve this validation code

    res.send(errors)

}

function loginValidation(req, res, next) {
    const errors = []
    const {email, password} = req.body
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    if(!email.toString().match(regex)) {
        errors.push({field: 'email', message: 'Email invalid'})
    }

    if(password.length < 6) {
        errors.push({field: 'password', message: 'Password must have 6 characteres'})
    }

    if(errors.length <= 0) return next()

    res.send(errors)
}

export {registerValidation, loginValidation}