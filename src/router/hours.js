import {Router} from 'express'
import * as hoursController from '../components/hours/hoursController.js'
import {verifyUserAuthentication, canUserAccessAdminPages} from '../components/users/userAuth.js'
import * as validation from '../components/hours/hoursValidation.js'
const router = Router()

router.get('/add-new-hours', canUserAccessAdminPages, hoursController.getAddHourRegisterPage)
router.get('/hours-register', canUserAccessAdminPages, hoursController.getHoursRegisterPage)

router.post('/post-hour', validation.hourValidation, hoursController.postHour)

export default {router}