import {Router} from 'express'
import * as wordsController from '../components/words/wordsController.js'
const router = Router()


router.get('/add-new-words', wordsController.getAddWordsPage)


export default {router}