import { Router } from "express";
import {getAddWordsPage, getWordsListPage, addNewWord} from "../components/words/wordsController.js";
import {canUserAccessAdminPages} from '../components/users/userAuth.js'
import {wordValidationRules} from '../components/words/wordsValidation.js'
import { deleteWord } from "../components/words/wordsController.js";
const router = Router();

router.get("/add-new-words", canUserAccessAdminPages, getAddWordsPage);
router.get("/words-list", canUserAccessAdminPages, getWordsListPage);
router.post("/post-word", wordValidationRules, addNewWord);
router.delete("/delete-word/:id", deleteWord)

export default { router };
