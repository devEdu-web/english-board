// function registerValidation(req, res, next) {
//     const errors = []
//     const {name, email, password, confirmPassword} = req.body
//     const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

//     if(name.length < 3) {
//         errors.push('Name must have 3 characters')
//     }

//     if(!email.toString().match(regex)) {
//         errors.push('Email invalid')
//     }

//     if(password.length < 6) {
//         errors.push('Password must have 6 characters')
//     }

//     if(password !== confirmPassword) {
//         errors.push('Passwords dont match')
//     }


//     if(errors.length <= 0) return next()

//     // TODO: Treat and send properly the errors to the user and improve this validation code

//     res.status(400).json(({errors}))

// }

// function loginValidation(req, res, next) {
//     const errors = []
//     const {email, password} = req.body
//     const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

//     if(!email.toString().match(regex)) {
//         errors.push('Email invalid')
//     }

//     if(password.length < 6) {
//         errors.push('Password must have 6 characters')
//     }

//     if(errors.length <= 0) return next()

//     res.status(400).json({errors})
// }

// function changeNameValidation(req, res, next) {
//     const errors = []
//     const {updatedName} = req.body
//     if(updatedName.length < 3) {
//         errors.push('Name must have at least 3 characters')
//     }

//     if(errors.length <= 0) return next()

//     res.status(400).json({errors})
// }

// function changeEmailValidation(req, res, next) {
//     const {updatedEmail} = req.body
//     const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
//     const errors = []

//     if(!updatedEmail.toString().match(regex)) {
//         errors.push('Invalid email')
//     }

//     if(errors.length <= 0) return next()

//     res.status(400).json({errors})
// }

// function changePasswordValidation(req, res, next) {
//     const {updatedPassword, confirmUpdatedPassword} = req.body
//     const errors = []
//     if(updatedPassword.length < 6) {
//         errors.push('Password must have 6 characters')
//     }

//     if(updatedPassword !== confirmUpdatedPassword) {
//         errors.push('Passwords dont match')
//     }


//     if(errors.length <= 0) return next()

//     // TODO: Treat and send properly the errors to the user and improve this validation code

//     res.status(400).json(({errors}))
// }

import {body} from 'express-validator'

const emailValidationRules = [
    body('name').isLength({min: 3}).withMessage('Name must be 3 characters long.'),
    body('email').isEmail().withMessage('Invalid Email.'),
    body('password').isLength({min: 6}).withMessage('Password must be 6 characters long.'),
    body('confirmPassword').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Passwords does not match.');
        }
        return true
    })
]



export {emailValidationRules}


// export {registerValidation, loginValidation, changeNameValidation, changeEmailValidation, changePasswordValidation}