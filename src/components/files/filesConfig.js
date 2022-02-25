import multer from 'multer'

export const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, './uploads'),
    filename: (req, file, callback) => callback(null, file.originalname)
})

export const fileFilter = (req, file, callback) => {
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg']
    fileTypes.includes(file.mimetype) ? callback(null, true) : callback(null, false)
}