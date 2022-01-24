import {check, validationResult} from 'express-validator'


export const error = [
    check("name").isLength({min: 3}),
    check("email").isEmail().withMessage('Please, insert a valid email!'),
    check("password").isLength({min: 6}).withMessage("Password have at least 6 characteres."),
]
