import wordModel from "./wordsModel.js";

function getAddWordsPage(req, res, next) {
    res.render("words");
}

function getWordsListPage(req, res, next) {
    res.render("words-list");
}

function getWordsInfo(req, res, next) {
    const wordInfo = req.body
    const word = wordInfo.word
    const wordClass = wordInfo['word-class']
    const newWord = new wordModel.Word(word, wordClass);
    newWord.save()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
}

export { getAddWordsPage, getWordsListPage, getWordsInfo };
