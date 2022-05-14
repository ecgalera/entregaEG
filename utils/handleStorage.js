// const req = require("express/lib/request")
const multer = require("multer")

const storage = multer.diskStorage({
    // Donde voy a guardar la imagen el camino 
    destination:(req, file, callback)=>{
        const pahtStorage = `${__dirname}/../storage`;
        callback(null, pahtStorage)
    },
    filename: (req, file, callback)=>{
        // cambio el nombre al archivo asi evito que haya nombres repetidos (no puede haber repetidos)
        // myfiel_01.alpha-omega.ext (quiero obtener la extención .ext)
        // originalname _ es una propiedad de multer
        const ext = file.originalname.split(".").pop()
        // lo renombro con un nombre aleatorio (Date.now())más la ext que capture de arriba
        const fileName = `img-${Date.now()}.${ext}` 
        callback(null, fileName)
    }
})

// Middleware que va ente la ruta y el controlador
const fileUpload = multer({storage})

// lo exporto a routes
module.exports = fileUpload
