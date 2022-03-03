import path from 'path'
import { fileURLToPath } from "url";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {User} from './User.js'
import { UserProgress } from './UserProgress.js';
import { validationResult } from 'express-validator';
import { validateToken } from './userAuth.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));



import cloudinary from 'cloudinary'
const cloudInit = cloudinary.v2





function getLoginPage(req, res, next) {
    const userToken = req.cookies.tk
    const isLogged = validateToken(userToken, process.env.JWT_SECRET)

    if(isLogged) return res.redirect('/')

    res.sendFile(path.join(__dirname, '..', '..', '..', 'views', 'login-page.html'))
}

function getRegisterPage(req, res, next) {
    const userToken = req.cookies.tk
    const isLogged = validateToken(userToken, process.env.JWT_SECRET)

    if(isLogged) return res.redirect('/')
    res.sendFile(path.join(__dirname, '..', '..', '..', 'views', 'register-page.html'))
}

async function getEditProfilePage(req, res, next) {
    const userToken = req.cookies.tk
    const userId = req.cookies.userId
    const isLogged = validateToken(userToken, process.env.JWT_SECRET)
    const currentUser = await User.findUserById(userId)

    if(!isLogged) return res.redirect('/login')

    res.render('edit-profile-page', {user: currentUser})
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


    } catch(err) {
        res.json({errors: [{msg: err.message}]})
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
        res.json({errors: [{msg: 'Email or password invalid.'}]})
    }
}

function userLogout(req, res, next) {
    res.clearCookie('tk')
    res.redirect('/login')
}


async function updateName(req, res, next) {
    const {userId} = req.cookies
    const {updatedName} = req.body

    try {
        await User.updateName(userId, updatedName)
        res.cookie('userName', updatedName)
        res.redirect('/edit-profile')
    } catch(e) {
        res.json(e)
    }

}

async function updateEmail(req, res, next) {
    const {userId} = req.cookies
    const {updatedEmail, password} = req.body
    const currentUser = await User.findUserById(userId)
    // TO-DO: ADD PASSWORD VALIDATION MIDDLEWARE TO CHANGE EMAIL

    try {
        const passwordsMatch = await bcrypt.compare(password, currentUser.password)
        if(!passwordsMatch) return res.status(400).json({errors: ['Invalid password']})
        await User.updateEmail(userId, updatedEmail)
        res.redirect('/edit-profile')
    } catch(e) {
        res.send(e)
    }
}

async function updatePassword(req, res, next) {
    const {userId} = req.cookies
    const {updatedPassword} = req.body

    //TO-DO ADD PASSWORD VALIDATION MIDDLEWARE

    try {
        const encryptedPassword = await bcrypt.hash(updatedPassword, 10)
        User.updatePassword(userId, encryptedPassword)
        res.redirect('/edit-profile')

    } catch(e) {
        res.send(e)
    }

}

async function updateProfilePicture(req, res, next) {
    const {path, filename} = req.file
    const {userId} = req.cookies


    // TO-DO: ADD THE CLOUDINARY LOGIC INTO THE USER MODEL AND VALIDATION TO FILE SIZE
    try {

        const uploadFile = await cloudInit.uploader.upload(path, {public_id: userId, })
        await User.updateProfilePicture(userId, uploadFile.url)
        res.send('profile picture saved')

    } catch(e) {
        res.send(e)
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
    updateProfilePicture
}
