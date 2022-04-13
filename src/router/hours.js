import {Router} from 'express'
import {getAddHourRegisterPage, getHoursRegisterPage, postHour} from '../components/hours/hoursController.js'
import {canUserAccessAdminPages} from '../components/users/userAuth.js'
import {hourValidationRules} from '../components/hours/hoursValidation.js'
import { deleteHour } from '../components/hours/hoursController.js'
const router = Router()

router.get('/add-new-hours', canUserAccessAdminPages, getAddHourRegisterPage)
router.get('/hours-register', canUserAccessAdminPages, getHoursRegisterPage)
router.post('/post-hour', hourValidationRules, postHour)
router.delete('/delete-hour', deleteHour)

export default {router}