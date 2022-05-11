import jwt from 'jsonwebtoken'

function canUserAccessAdminPages(req, res, next) {
	const {tk} = req.cookies
	try {
		jwt.verify(tk, process.env.JWT_SECRET)
		next()
	} catch (e) {
		res.redirect('/home')
	}

}

function verifyUserAuthentication(req, res, next) {
	const {tk} = req.cookies
	try {
		jwt.verify(tk, process.env.JWT_SECRET)
		res.redirect('/home')
	} catch (e) {
		next()
	}

}

export {canUserAccessAdminPages, verifyUserAuthentication}
