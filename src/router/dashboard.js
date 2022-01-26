import {Router} from 'express';
import * as dashboardController from '../components/dashboard/dashboardController.js'
import * as userAuth from '../components/users/userAuth.js'
const router = Router()

router.get('/', userAuth.authentication, dashboardController.getDashboardPage)

export default { router }