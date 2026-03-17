const multer = require("multer")
const {storage} = require('../config/cloudinary.js')

const upload = multer({
    storage: storage,
    limits:{filesize:5*1024*1024} //5mb limit
})

module.exports = upload