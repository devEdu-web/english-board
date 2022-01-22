import path from 'path'
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));


function getLoginPage(req, res, next) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'views', 'login-page.html'))
}

function getRegisterPage(req, res, next) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'views', 'register-page.html'))
}

export {getLoginPage, getRegisterPage}