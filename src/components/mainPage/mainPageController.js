import path from 'path'
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getMainPage(req, res, next) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'views', 'main.html'))
}