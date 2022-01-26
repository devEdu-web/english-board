import jwt from 'jsonwebtoken'

function validateToken(token, userData) {
    try {
        const token = jwt.verify(token, process.env.JWT_SECRET)
        return token
    } catch(e) {
        return false
    }
}

function authentication(req, res, next) {
    const userToken = req.cookies.tk
    console.log(userToken)
    if(!userToken) return res.redirect('/login')

    try {
        const isUserVerified = jwt.verify(userToken, process.env.JWT_SECRET)
        next()
    } catch (e) {
        res.redirect('/login')
    }

}

export {validateToken, authentication}