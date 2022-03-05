import { Router } from "express";
import {getAddWordsPage, getWordsListPage, addNewWord} from "../components/words/wordsController.js";
import {canUserAccessAdminPages} from '../components/users/userAuth.js'
import {wordValidationRules} from '../components/words/wordsValidation.js'
const router = Router();

router.get("/add-new-words", canUserAccessAdminPages, getAddWordsPage);
router.get("/words-list", canUserAccessAdminPages, getWordsListPage);

router.post("/post-word", wordValidationRules, addNewWord);

export default { router };
