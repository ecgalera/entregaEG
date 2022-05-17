const express = require ("express");
require("dotenv").config()
const PORT = process.env.PORT
require("./db/config")
const cors = require("cors")

const server = express();
server.use(express.json())
// para acceder a la imagen
server.use(express.static("storage"))
// para que no me bloquee cuando uso la api con otro recurso en otro servidor
server.use(cors())

// Rutas 
server.use("/users", require("./users/usersRouter"))
server.use("/posts", require("./posts/postsRouter"))

//Error 404
server.use((req, res, next)=>{
    let error = new Error("Resource not found")
    error.status = 404
    next(error)
})

// Manejador de Errores
server.use((error, req, res, next)=>{
    if(!error.status){
        error.status = 500
    }
    res.status(error.status).json({estatus: error.status, message: error.message})
})


server.listen(PORT, (err)=>{
    err?console.log(`Error: ${err}`): console.log(`Servidor en http://localhost: ${PORT}`);;
})

