import {UserProgress} from '../users/UserProgress.js'
import {User} from '../users/User.js'
import {validationResult} from 'express-validator'
import {ObjectId} from 'mongodb'

async function getAddHourRegisterPage(req, res, next) {
    const {userId, userName} = req.cookies

    try {
        const userProgress = await UserProgress.getUserProgress(userId)
        const userInfo = await User.findUserById(userId)
        res.render('hours', {userName, userProgress, userInfo})
    } catch(error) {
        res.status(500).json({errors: [{msg: error.message}]})
    }
} 

async function getHoursRegisterPage(req, res, next) {
    const {userName, userId} = req.cookies

    try {
        const userProgress = await UserProgress.getUserProgress(userId)
        const userInfo = await User.findUserById(userId)
        res.render('hours-register', {userProgress, userName, userInfo})
    } catch(error) {
        res.status(500).json({errors: [{msg: error.message}]})
    }
}

async function postHour(req, res, next) {
    const {userId} = req.cookies
    const hourCounter = Number(req.body.hourCounter)
    const hourInfo = req.body.hourInfo
    const errors = validationResult(req)
    console.log(errors)
    if(errors.errors.length > 0) return res.status(400).json(errors)

    try {   
        await UserProgress.updateHoursInfo(userId, hourCounter, hourInfo)
        res.redirect('/hours/hours-register')
    } catch(error) {
        res.status(500).json({errors: [{msg: error.message}]})
    }    
}

async function deleteHour(req, res, next) {
    const {userId} = req.cookies
    const hourId = req.query.hourInfoId
    const amount_deleted = req.query.amount_deleted


    try {
        await UserProgress.deleteHour(userId, hourId, amount_deleted)
        res.sendStatus(200)
    } catch(error) {
        res.sendStatus(400)
    }

}

export {getAddHourRegisterPage, getHoursRegisterPage, postHour, deleteHour};