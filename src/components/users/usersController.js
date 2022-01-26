import path from 'path'
import { fileURLToPath } from "url";
import bcrypt from 'bcrypt'
import {User} from './User.js'
const __dirname = path.dirname(fileURLToPath(import.meta.url));


function getLoginPage(req, res, next) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'views', 'login-page.html'))
}

function getRegisterPage(req, res, next) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'views', 'register-page.html'))
}

async function registerUser(req, res, next) {
    const {name, email, password} = req.body
    const repeatedUser = await User.findUsers(email)
    const userPasswordEncrypted = await bcrypt.hash(password, 10)

    if(repeatedUser) return res.status(401).json({satusCode: 401, message: 'Email already exists'})

    const user = new User(name, email, userPasswordEncrypted)
    console.log(user)

    user.save()
    .then(result => res.send('user saved'))
    .catch(e => res.send(e))


}

function logUser(req, res, next) {

}

export {getLoginPage, getRegisterPage, registerUser, logUser}