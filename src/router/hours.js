import {Router} from 'express'
import {getAddHourRegisterPage, getHoursRegisterPage, postHour} from '../components/hours/hoursController.js'
import {canUserAccessAdminPages} from '../components/users/userAuth.js'
import * as validation from '../components/hours/hoursValidation.js'
const router = Router()

router.get('/add-new-hours', canUserAccessAdminPages, getAddHourRegisterPage)
router.get('/hours-register', canUserAccessAdminPages, getHoursRegisterPage)

router.post('/post-hour', validation.hourValidation, postHour)

export default {router}