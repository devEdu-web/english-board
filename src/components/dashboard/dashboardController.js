import {getClassesPercentage} from '../../util/getPercentage.js'
import {getHoursPercentage} from '../../util/getPercentage.js'
import {UserProgress} from '../users/UserProgress.js'
import {User} from '../users/User.js'

async function getDashboardPage(req, res, next) {
    const userId = req.cookies.userId
    const userName = req.cookies.userName
    const words = await getClassesPercentage(userId)
    const hours = await getHoursPercentage(userId)
    const userInfo = await User.findUserById(userId)
    const userProgress = await UserProgress.getUserProgress(userId)

    console.log(words)
    console.log(hours)
    console.log(userProgress)
    res.render('index', {
        userName,
        userProgress,
        words,
        hours,
        userInfo
    })

}

export {getDashboardPage}