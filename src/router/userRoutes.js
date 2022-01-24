import {Router} from 'express'
import * as userController from '../components/users/usersController.js'
import * as validation from '../components/users/usersValidation.js'
const router = Router()


router.get('/login', userController.getLoginPage)
router.get('/register', userController.getRegisterPage)

router.post('/login', userController.logUser)
router.post('/register', validation.error, userController.registerUser)


export default {router}