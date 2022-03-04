import { Router } from "express";
import * as wordsController from "../components/words/wordsController.js";
import {verifyUserAuthentication, canUserAccessAdminPages} from '../components/users/userAuth.js'
import * as validation from '../components/words/wordsValidation.js'
const router = Router();

router.get("/add-new-words", canUserAccessAdminPages, wordsController.getAddWordsPage);
router.get("/words-list", canUserAccessAdminPages, wordsController.getWordsListPage);

router.post("/post-word", validation.wordValidation, wordsController.getWordsInfo);

export default { router };
