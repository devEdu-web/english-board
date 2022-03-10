import {Router} from 'express';
import {getDashboardPage} from '../components/dashboard/dashboardController.js'
import {canUserAccessAdminPages} from '../components/users/userAuth.js'
const router = Router()

router.get('/', canUserAccessAdminPages, getDashboardPage)

export default { router }