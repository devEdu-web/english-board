import jwt from 'jsonwebtoken'

function validateToken(token, userData) {
    const userToken = token
    try {
        const token = jwt.verify(userToken, process.env.JWT_SECRET)
        return token
    } catch(e) {
        return false
    }
}

function canUserAccessAdminPages(req, res, next) {
    const {tk} = req.cookies
    // if(!userToken) return res.redirect('/login')

    try {
        jwt.verify(tk, process.env.JWT_SECRET)
        next()
    } catch (e) {
        res.redirect('/login')
    }

}

function verifyUserAuthentication(req, res, next) {
    const {tk} = req.cookies
    try {
        jwt.verify(tk, process.env.JWT_SECRET)
        res.redirect('/')
    } catch(e) {
        next()
    }

}

export {validateToken, canUserAccessAdminPages, verifyUserAuthentication}