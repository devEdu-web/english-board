import {Router} from 'express'
import * as wordsController from '../components/words/wordsController.js'
const router = Router()


router.get('/add-new-words', wordsController.getAddWordsPage)
router.get('/words-list', wordsController.getWordsListPage)

export default {router}