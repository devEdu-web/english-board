function getAddWordsPage(req, res, next) {
    res.render('words')
}

function getWordsListPage(req, res, next) {
    res.render('words-list')
}

export {getAddWordsPage, getWordsListPage}