import path from 'path'
import { fileURLToPath } from "url";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {User} from './User.js'
import { UserProgress } from './UserProgress.js';
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

    try {

        const {name, email, password} = req.body
        const repeatedUser = await User.findUserByEmail(email)
        const userPasswordEncrypted = await bcrypt.hash(password, 10)
    
        if(repeatedUser) return res.status(401).json({statusCode: 401, message: 'Email already exists'})
    
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
        res.json(err)
    }

}

async function logUser(req, res, next) {
    const {email, password} = req.body
    const thisUserExists = await User.findUserByEmail(email)
    if(!thisUserExists) return res.send('User doesnt exists')

    const passwordsMatch = await bcrypt.compare(password, thisUserExists.password)
    if(!passwordsMatch) return res.send('Wrong password')


    const {name, _id} = thisUserExists
    const userToken = jwt.sign({name, userId: _id.toString()}, process.env.JWT_SECRET, {expiresIn: '1h'})

    res.cookie('tk', userToken),
    res.cookie('userName', name)
    res.cookie('userId', _id.toString())

    res.redirect('/')

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
        res.send('Name updated')
    } catch(e) {
        res.send(e)
    }

}

async function updateEmail(req, res, next) {
    const {userId} = req.cookies
    const {updatedEmail, password} = req.body
    const currentUser = await User.findUserById(userId)
    // TO-DO: ADD PASSWORD VALIDATION MIDDLEWARE TO CHANGE EMAIL

    try {
        const passwordsMatch = await bcrypt.compare(password, currentUser.password)
        if(!passwordsMatch) return res.send('Invalid password')
        await User.updateEmail(userId, updatedEmail)
        res.send('Email updated')
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
        res.send('Password Updated')

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
