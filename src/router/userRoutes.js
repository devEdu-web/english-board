import multer from 'multer'
import {Router} from 'express'
import {registerValidationRules, updateNameRules, updateEmailRules, updatePasswordRules} from '../components/users/usersValidation.js'
import {verifyUserAuthentication, canUserAccessAdminPages} from '../components/users/userAuth.js'
import { fileFilter, fileStorage } from '../components/files/filesConfig.js'
import {
    getLoginPage,
    getRegisterPage,
    getEditProfilePage,
    registerUser,
    logUser,
    userLogout,
    updateName,
    updateEmail,
    updatePassword,
    updateProfilePicture,
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

// TO-DO: CHANGE THIS METHODS TO PUT
// Update routes

router.post('/edit-profile', upload.single('updatedPicture'), updateProfile)

// router.post('/update-name', updateNameRules, updateName)
// router.post('/update-email', updateEmailRules, updateEmail)
// router.post('/update-password', updatePasswordRules, updatePassword)
// router.post('/update-profile-picture', upload.single('updatedPicture'), updateProfilePicture)

export default {router}