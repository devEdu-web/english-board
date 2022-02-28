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

router.post('/login', validation.loginValidation, userController.logUser)
router.post('/register', validation.registerValidation, userController.registerUser)



// router.post('/edit-profile', upload.single('pictureProfile'), userController.postUserChanges)

// TO-DO: CHANGE THIS METHODS TO PUT
router.post('/update-name', userController.updateName)
router.post('/update-email', userController.updateEmail)
router.post('/update-password', userController.updatePassword)
router.post('/update-profile-picture', upload.single('updatedPicture'), userController.updateProfilePicture)

export default {router}