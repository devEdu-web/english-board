import {Router} from 'express';
import * as dashboardController from '../components/dashboard/dashboardController.js'
import {verifyUserAuthentication, canUserAccessAdminPages} from '../components/users/userAuth.js'
const router = Router()

router.get('/', canUserAccessAdminPages, dashboardController.getDashboardPage)

export default { router }