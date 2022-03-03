import {Router} from 'express'
import multer from 'multer'
import * as userController from '../components/users/usersController.js'
import * as validation from '../components/users/usersValidation.js'
import * as userAuth from '../components/users/userAuth.js'
import { fileFilter, fileStorage } from '../components/files/filesConfig.js'

const router = Router()
const upload = multer({
    storage: fileStorage,
    fileFilter
})



router.get('/login', userController.getLoginPage)
router.get('/register', userController.getRegisterPage)
router.get('/logout', userController.userLogout)
router.get('/edit-profile', userController.getEditProfilePage)

router.post('/login', userController.logUser)
router.post('/register', validation.registerValidationRules, userController.registerUser)




// TO-DO: CHANGE THIS METHODS TO PUT
// router.post('/update-name', validation.changeNameValidation, userController.updateName)
// router.post('/update-email', validation.changeEmailValidation, userController.updateEmail)
// router.post('/update-password', validation.changePasswordValidation, userController.updatePassword)
// router.post('/update-profile-picture', upload.single('updatedPicture'), userController.updateProfilePicture)

export default {router}