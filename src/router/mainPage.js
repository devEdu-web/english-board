import {Router} from 'express'
import {verifyUserAuthentication, canUserAccessAdminPages} from '../components/users/userAuth.js'
import { getMainPage } from '../components/mainPage/mainPageController.js'
const router = Router()

router.get('/', verifyUserAuthentication, getMainPage)

export default {router}