import path from 'path'
import { fileURLToPath } from "url";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {User} from './User.js'
import { UserProgress } from './UserProgress.js';
import { validateToken } from './userAuth.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


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

function getEditProfilePage(req, res, next) {
    res.render('edit-profile-page')
}

async function registerUser(req, res, next) {

    try {

        const {name, email, password} = req.body
        const repeatedUser = await User.findUserByEmail(email)
        const userPasswordEncrypted = await bcrypt.hash(password, 10)
    
        if(repeatedUser) return res.status(401).json({satusCode: 401, message: 'Email already exists'})
    
        const user = new User(name, email, userPasswordEncrypted)
        const userProgress = new UserProgress(
            user._id, 
            {wordsCounter: 0, userWords: []},
            {hoursCounter: 0, hoursInfo: []}
            )
    
        await user.save()
        await userProgress.save()

        res.send('User and progress saved')

        console.log(user)
        console.log(userProgress)

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
    const userToken = jwt.sign({name, userId: _id.toString()}, process.env.JWT_SECRET, {expiresIn: 60})

    res.cookie('tk', userToken),
    res.cookie('userName', name)
    res.cookie('userId', _id.toString())

    res.redirect('/')

}

function userLogout(req, res, next) {
    res.clearCookie('tk')
    res.redirect('/login')
}

export {getLoginPage, getRegisterPage, getEditProfilePage, registerUser, logUser, userLogout}