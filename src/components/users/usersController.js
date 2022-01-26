import path from 'path'
import { fileURLToPath } from "url";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
    const repeatedUser = await User.findUser(email)
    const userPasswordEncrypted = await bcrypt.hash(password, 10)

    if(repeatedUser) return res.status(401).json({satusCode: 401, message: 'Email already exists'})

    const user = new User(name, email, userPasswordEncrypted)

    user.save()
    .then(result => res.send('user saved'))
    .catch(e => res.send(e))


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

export {getLoginPage, getRegisterPage, registerUser, logUser}