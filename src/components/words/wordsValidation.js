import {body} from 'express-validator'


const wordValidationRules = [
    body('word').not().isEmpty().withMessage('Please type a word.')
]


export {wordValidationRules}