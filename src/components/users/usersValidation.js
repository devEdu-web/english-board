function dataValidation(req, res, next) {
    const errors = []
    const {name, email, password, confirmPassword} = req.body

    if(name.length < 3) {
        errors.push({field: 'name', message: 'Name must have 3 characteres'})
    }

    if(email.toLowerCase().match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i)) {
        errors.push({field: 'email', message: 'Email invalid'})
    }

    if(password.length < 6) {
        errors.push({field: 'password', message: 'Password must have 6 characteres'})
    }

    if(password !== confirmPassword) {
        errors.push({field: 'confirmPassword', message: 'Passwords dont match'})
    }

    if(errors.length <= 0) return next()

    console.log(errors)

    res.send(errors)

}

export {dataValidation}