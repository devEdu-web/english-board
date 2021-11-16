import {Router} from 'express'
import * as hoursController from '../components/hours/hoursController.js'
const router = Router()

router.get('/add-new-hours', hoursController.getAddHourRegisterPage)
router.get('/hours-register', hoursController.getHoursRegisterPage)

export default {router}