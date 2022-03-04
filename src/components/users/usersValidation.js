import {body} from 'express-validator'
import bcrypt from 'bcrypt'
import {User} from './User.js'

const registerValidationRules = [
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

const updateNameRules = [
    body('updatedName').isLength({min: 3}).withMessage('Name must be 3 characters long.')
]

export {registerValidationRules, updateNameRules}


// export {registerValidation, loginValidation, changeNameValidation, changeEmailValidation, changePasswordValidation}