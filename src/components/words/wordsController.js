import wordModel from "./wordsModel.js";

function getAddWordsPage(req, res, next) {
    res.render("words");
}

function getWordsListPage(req, res, next) {
    const allWords = wordModel.Word.getAllWords()
    allWords.toArray()
    .then(words => {
        res.render("words-list", {allWords: words});
    })
    .catch(err => console.log(err))
}

function getWordsInfo(req, res, next) {
    const wordInfo = req.body
    const word = wordInfo.word
    const wordClass = wordInfo.wordClass
    const newWord = new wordModel.Word(word, wordClass);
    console.log(wordInfo)
    newWord.save()
    .then((result) => {
        res.redirect('/words/words-list')
    })
    .catch((err) => console.log(err));
}

export { getAddWordsPage, getWordsListPage, getWordsInfo };
