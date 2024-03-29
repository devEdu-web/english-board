import multer from 'multer'
import {Router} from 'express'
import {registerValidationRules} from '../components/users/usersValidation.js'
import {verifyUserAuthentication, canUserAccessAdminPages} from '../components/users/userAuth.js'
import { fileFilter, fileStorage } from '../components/files/filesConfig.js'
import {
    getLoginPage,
    getRegisterPage,
    getEditProfilePage,
    registerUser,
    logUser,
    userLogout,
    updateProfile
} from '../components/users/usersController.js'

const router = Router()
const upload = multer({
    storage: fileStorage,
    fileFilter
})

router.get('/login', verifyUserAuthentication, getLoginPage)
router.get('/register', verifyUserAuthentication, getRegisterPage)
router.get('/edit-profile', canUserAccessAdminPages, getEditProfilePage)
router.get('/logout', userLogout)

router.post('/login', logUser)
router.post('/register', registerValidationRules, registerUser)
router.post('/edit-profile', upload.single('updatedPicture'), updateProfile)


export default {router}