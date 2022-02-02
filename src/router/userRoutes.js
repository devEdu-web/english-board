import {Router} from 'express'
import * as userController from '../components/users/usersController.js'
import * as validation from '../components/users/usersValidation.js'
import * as userAuth from '../components/users/userAuth.js'
const router = Router()


router.get('/login', userController.getLoginPage)
router.get('/register', userController.getRegisterPage)
router.get('/logout', userController.userLogout)
router.get('/edit-profile', userController.getEditProfilePage)

router.post('/login', validation.loginValidation, userController.logUser)
router.post('/register', validation.registerValidation, userController.registerUser)


export default {router}