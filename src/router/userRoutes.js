import {Router} from 'express'
import * as userController from '../components/users/usersController.js'
const router = Router()


router.get('/login', userController.getLoginPage)
router.get('/register', userController.getRegisterPage)


export default {router}