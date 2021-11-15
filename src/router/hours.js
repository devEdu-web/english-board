import {Router} from 'express'
import * as hoursController from '../components/hours/hoursController.js'
const router = Router()

router.get('/add-new-hours', hoursController.getAddHourRegisterPage)

export default {router}