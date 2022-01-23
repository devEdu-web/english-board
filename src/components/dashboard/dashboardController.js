import {getAllCollections} from '../../util/getCollections.js'
import {getClassesPercentage} from '../../util/getPercentage.js'

function getDashboardPage(req, res, next) {
    const teste = getClassesPercentage().then(message => message).catch(err => err)

    // getClassesPercentage()
    // .then(percentage => {
    //     res.send(percentage)
    // })
    // .catch(err => console.log(err))

    getAllCollections()
    .then(collections => {
        // console.log(collections)
        res.render('index', {collections})
    })
    .catch(err => console.log(err))

}

export {getDashboardPage}