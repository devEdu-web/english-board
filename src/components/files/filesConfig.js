import multer from 'multer'

export const fileStorage = multer.diskStorage({
    filename: (req, file, callback) => callback(null, file.originalname),
    
})

export const fileFilter = (req, file, callback) => {
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg']
    fileTypes.includes(file.mimetype) ? callback(null, true) : callback(null, false)
    file.size > 2000000 ? callback(null, false) : callback(null, true)
}