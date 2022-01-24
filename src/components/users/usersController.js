import path from 'path'
import { fileURLToPath } from "url";
import {check, validationResult} from 'express-validator'
import {User} from './User.js'
const __dirname = path.dirname(fileURLToPath(import.meta.url));


function getLoginPage(req, res, next) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'views', 'login-page.html'))
}

function getRegisterPage(req, res, next) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'views', 'register-page.html'))
}

async function registerUser(req, res, next) {
    const errors = validationResult(req)
    if(errors.length > 0) return res.status(401).json(errors)

    const {name, email, password} = req.body
    const repeatedUser = await User.findUsers(email)

    if(repeatedUser) return res.status(401).json({satusCode: 401, message: 'Email already exists'})

    const user = new User(name, email, password)

    user.save()
    .then(result => res.send('deu'))
    .catch(e => res.send(e))

    console.log(repeatedUser)
    

}

function logUser(req, res, next) {

}

export {getLoginPage, getRegisterPage, registerUser, logUser}