import server from './src/app.js'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT

server.app.listen(port, (err => {
    if(err) {
        throw err
    } else {
        console.log(`Conected on port: ${port}`)
    }
}))
