import {body} from 'express-validator'


const hourValidationRules = [
    body('hourCounter').not().isEmpty().withMessage('Please fill out every field.'),
    body('hourInfo').not().isEmpty().withMessage('Please fill out every field.')
]


export {hourValidationRules}