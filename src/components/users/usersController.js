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

    console.log(currentUser)

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

        res.send('User and progress saved')


    } catch(err) {
        res.send(err)
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

async function postUserChanges(req, res, next) {
    const {path, filename} = req.file
    const {userId} = req.cookies
    const uploadFile = await cloudInit.uploader.upload(path, {public_id: userId, })
    await User.updateProfilePicture(userId, uploadFile.url)
    res.send('profile picture saved')
    

}

export {getLoginPage, getRegisterPage, getEditProfilePage, registerUser, logUser, userLogout, postUserChanges}