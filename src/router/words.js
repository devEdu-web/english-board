import { Router } from "express";
import * as wordsController from "../components/words/wordsController.js";
import * as userAuth from '../components/users/userAuth.js'
const router = Router();

router.get("/add-new-words", userAuth.authentication, wordsController.getAddWordsPage);
router.get("/words-list", userAuth.authentication, wordsController.getWordsListPage);

router.post("/post-word", wordsController.getWordsInfo);

export default { router };
