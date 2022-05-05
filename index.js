const express = require ("express");
require("dotenv").config()
const PORT = process.env.PORT || 3000;
require("./db/config")

const server = express();
server.use(express.json())

server.use("/users", require("./users/usersRouter"))

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

