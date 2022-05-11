const req = require("express/lib/request")
const multer = require("multer")
const storage = multer.diskStorage({
    destination:(req, file, callback)=>{
        const pahtStorage = `${__dirname}/../storage`;
        callback(null, pahtStorage)
    },
    filename: (req, file, callback)=>{
        const ext = file.originalname.split(".").pop()
        const fileName = `img-${Date.now()}.${ext}` 
        callback(null, fileName)
    }
})

const fileUpload = multer({storage})

module.exports = fileUpload