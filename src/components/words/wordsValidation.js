function wordValidation(req, res, next) {
    const {word} = req.body
    const errors = []

    if(word.length <= 0) {
        errors.push('Please, type a word')
    }

    if(errors.length <= 0) return next()

    res.status(400).json({errors})

}

export {wordValidation}