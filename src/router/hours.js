import {Router} from 'express'
import * as hoursController from '../components/hours/hoursController.js'
import * as userAuth from '../components/users/userAuth.js'
import * as validation from '../components/hours/hoursValidation.js'
const router = Router()

router.get('/add-new-hours', userAuth.authentication, hoursController.getAddHourRegisterPage)
router.get('/hours-register', userAuth.authentication, hoursController.getHoursRegisterPage)

router.post('/post-hour', validation.hourValidation, hoursController.postHour)

export default {router}