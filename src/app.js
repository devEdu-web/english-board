import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'


const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.join(__dirname, "..", "public")))
app.use(express.urlencoded())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "..", "views"))

app.use('/', (req, res, next) => {res.render('words')} )



export default { app }