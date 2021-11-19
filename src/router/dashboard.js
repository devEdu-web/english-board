import {Router} from 'express';
import * as dashboardController from '../components/dashboard/dashboardController.js'
const router = Router()

router.get('/', dashboardController.getDashboardPage)

export default { router }