import {getAllCollections} from '../../util/getCollections.js'

function getDashboardPage(req, res, next) {
    getAllCollections()
    .then(collections => {
        console.log(collections)
        res.render('index', {collections})
    })
    .catch(err => console.log(err))

}

export {getDashboardPage}