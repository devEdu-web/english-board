import {Router} from 'express'
import * as hoursController from '../components/hours/hoursController.js'
import * as userAuth from '../components/users/userAuth.js'
const router = Router()

router.get('/add-new-hours', userAuth.authentication, hoursController.getAddHourRegisterPage)
router.get('/hours-register', userAuth.authentication, hoursController.getHoursRegisterPage)

router.post('/post-hour', hoursController.postHour)

export default {router}