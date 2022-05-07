// Importo Models 
const {getAllUsers, getUserById} =require("./usersModel")
const notNumber = require("../utils/notNumber")

// Obtengo todos los registros 
const listAll = async(req, res, next)=>{
    const dbResponse =  await getAllUsers()
    if(dbResponse instanceof Error) return  next(dbResponse)
    dbResponse.length ? res.status(200).json(dbResponse) : next()
}
// Obtengo un registro por id
const getOne = async(req, res, next)=>{
    if(notNumber(req.params.id, next)) return;
    const dbResponse = getUserById(+req.params.id)
    if(dbResponse instanceof Error) return  next(dbResponse)
    dbResponse.length ? res.status(200).json(dbResponse) : next()
}

// Exporto Controllers
module.exports = {listAll, getOne}