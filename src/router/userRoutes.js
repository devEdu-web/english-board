import {Router} from 'express'
import multer from 'multer'
import * as userController from '../components/users/usersController.js'
import * as validation from '../components/users/usersValidation.js'
import * as userAuth from '../components/users/userAuth.js'
import { fileFilter, fileStorage } from '../components/users/userFilesConfig.js'

const router = Router()
const upload = multer({
    storage: fileStorage,
    fileFilter
})



router.get('/login', userController.getLoginPage)
router.get('/register', userController.getRegisterPage)
router.get('/logout', userController.userLogout)
router.get('/edit-profile', userController.getEditProfilePage)

router.post('/login', validation.loginValidation, userController.logUser)
router.post('/register', validation.registerValidation, userController.registerUser)
router.post('/edit-profile', upload.single('pictureProfile'), userController.postUserChanges)

export default {router}