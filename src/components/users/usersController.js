import path from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cloudinary from 'cloudinary'
import { fileURLToPath } from "url";
import {User} from './User.js'
import { UserProgress } from './UserProgress.js';
import { validationResult } from 'express-validator';
import { verifyEmail } from '../../util/verifyEmail.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cloudInit = cloudinary.v2

function getLoginPage(req, res, next) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'views', 'login-page.html'))
}

function getRegisterPage(req, res, next) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'views', 'register-page.html'))
}

async function getEditProfilePage(req, res, next) {
    const {userId} = req.cookies

    try {
        const currentUser = await User.findUserById(userId)
        res.render('edit-profile-page', {user: currentUser})
    } catch (error) {
        res.status(500).json({errors: [{msg: error.message}]})
    }
}

async function registerUser(req, res, next) {
    const errors = validationResult(req)
    const {name, email, password} = req.body
    if(errors.errors.length > 0) return res.status(400).json(errors)

    try {
        const repeatedUser = await User.findUserByEmail(email)
        const userPasswordEncrypted = await bcrypt.hash(password, 10)
    
        if(repeatedUser) return res.status(400).json({errors: [{msg: 'Email already exists'}]})
    
        const user = new User(name, email, userPasswordEncrypted)
        const userProgress = new UserProgress(
            user._id, 
            {wordsCounter: 0, userWords: []},
            {hoursCounter: 0, hoursInfo: []}
            )
    
        await user.save()
        await userProgress.save()
        res.redirect('/login')
    } catch(error) {
        res.status(500).json({errors: [{msg: error.message}]})
    }

}

async function logUser(req, res, next) {
    const {email, password} = req.body

    try {
        const fetchedUser = await User.findUserByEmail(email)
        if(!fetchedUser) return res.status(400).json({errors: [{msg: 'Email or password invalid'}]})

        const passwordsMatch = await bcrypt.compare(password, fetchedUser.password)
        if(!passwordsMatch) return res.status(400).json({errors: [{msg: 'Email or password invalid'}]})

        const {name, _id} = fetchedUser
        const userToken = jwt.sign({name, userId: _id.toString()}, process.env.JWT_SECRET, {expiresIn: '1h'})
    
        res.cookie('tk', userToken),
        res.cookie('userName', name)
        res.cookie('userId', _id.toString())
    
        res.redirect('/')

    } catch(error) {
        res.status(500).json({errors: [{msg: error.message}]})
    }
}

function userLogout(req, res, next) {
    res.clearCookie('tk')
    res.redirect('/login')
}


async function updateName(req, res, next) {
    const {userId} = req.cookies
    const {updatedName} = req.body
    const errors = validationResult(req)
    if(errors.errors.length > 0) return res.status(400).json(errors)

    try {
        await User.updateName(userId, updatedName)
        res.cookie('userName', updatedName)
        res.redirect('/edit-profile')
    } catch(error) {
        res.status(500).json({errors: [{msg: error.message}]})
    }

}

async function updateEmail(req, res, next) {
    const {userId} = req.cookies
    const {updatedEmail, password} = req.body
    const errors = validationResult(req)
    if(errors.errors.length > 0) return res.status(400).json(errors)
    
    try {
        const currentUser = await User.findUserById(userId)
        const passwordsMatch = await bcrypt.compare(password, currentUser.password)
        if(!passwordsMatch) return res.status(400).json({errors: [{msg: 'Invalid password'}]})
        await User.updateEmail(userId, updatedEmail)
        res.redirect('/edit-profile')
    } catch(error) {
        res.status(500).json({errors: [{msg: error.message}]})
    }
}

async function updatePassword(req, res, next) {
    const {userId} = req.cookies
    const {updatedPassword} = req.body
    const errors = validationResult(req)
    if(errors.errors.length > 0) return res.status(400).json(errors)

    try {
        const encryptedPassword = await bcrypt.hash(updatedPassword, 10)
        User.updatePassword(userId, encryptedPassword)
        res.redirect('/edit-profile')
    } catch(error) {
        res.status(500).json({errors: [{msg: error.message}]})
    }
}

async function updateProfilePicture(req, res, next) {
    const file = req.file
    const {userId} = req.cookies
    if(!req.file || req.file.size > 2000000) return res.status(400).json({errors: [{msg: 'Invalid file.'}]})

    try {
        const uploadFile = await cloudInit.uploader.upload(file.path, {public_id: userId, })
        await User.updateProfilePicture(userId, uploadFile.url)
        res.redirect('/edit-profile')

    } catch(error) {
        res.status(500).json({errors: [{msg: error.message}]})
    }
}

async function updateProfile(req, res, next) {
    const {name, email, newPassword, confirmNewPassword, updatedPicture, currentPassword} = req.body
    const {userId} = req.cookies
    const {file} = req
    const user = await User.findUserById(userId)
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
    
    try {
        if(!name && !email && !newPassword && !file) return res.status(400).json({errors: [{msg: 'Nothing to update.'}]})

        if(name) {
            if(name.length < 3) return res.status(400).json({errors: [{msg: 'Name must be 3 characters.'}]})
            await User.updateName(userId, name)
        } 

        if(email) {
            const isEmailValid = verifyEmail(email)
            const repeatedUser = await User.findUserByEmail(email)

            console.log(repeatedUser)

            if(repeatedUser) return res.status(400).json({errors: [{msg: 'Email already exists.'}]})
            if(!isEmailValid) return res.status(400).json({errors: [{msg: 'Invalid email.'}]})
            await User.updateEmail(userId, email)
        }
        
        if(newPassword) {
            if(newPassword.length < 6) return res.status(400).json({errors: [{msg: 'Passwords must be 6 character long.'}]})
            if(newPassword !== confirmNewPassword) return res.status(400).json({errors: [{msg: 'Passwords does not match.'}]})
            const encryptedPassword = await bcrypt.hash(newPassword, 10)
            User.updatePassword(userId, encryptedPassword)
        }

        if(file) {
            if(file.size > 2000000) return res.status(400).json({errors: [{msg: 'File must be max 2Mb.'}]})
            const uploadFile = await cloudInit.uploader.upload(file.path, {public_id: userId, })
            await User.updateProfilePicture(userId, uploadFile.url)
        }
        
        if(!isCurrentPasswordValid) return res.status(400).json({errors: [{msg: 'Invalid password.'}]})
        
        res.redirect('/edit-profile')

    } catch(error) {
        console.log(error)
    }

}


export {
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
    
}
