// Importo Models 
const {getAllUsers, getUserById, registerNewUser, deleteUsers, editUser} =require("./usersModel")
const notNumber = require("../utils/notNumber")
const {hashPassword, checkPassword} = require("../utils/handlePassword")


// Obtengo todos los registros 
const listAll = async(req, res, next)=>{
    const dbResponse =  await getAllUsers()
    if(dbResponse instanceof Error) return  next(dbResponse)
    dbResponse.length ? res.status(200).json(dbResponse) : next()
}
// Obtengo un registro por id
const getOne = async(req, res, next)=>{
    if(notNumber(req.params.id, next)) return;
    const dbResponse = await getUserById(+req.params.id)
    if(dbResponse instanceof Error) return  next(dbResponse)
    dbResponse.length ? res.status(200).json(dbResponse) : next()
}

// Regitro un nuevo usuario
const newOne = async (req, res)=>{
    const password = await hashPassword(req.body.password)
    const dbResponse = await registerNewUser({...req.body, password})
    dbResponse instanceof Error ? next(dbResponse) : res.status(201)
    .json({ message: `User ${req.body.nombre} created!` })
    
}
// Eliminar un registro
const removeOne = async(req, res, next)=>{
    if(notNumber(req.params.id, next)) return;
    const dbResponse = await deleteUsers(+req.params.id)
    if(dbResponse instanceof Error) return  next(dbResponse)
    dbResponse.affectedRows ? res.status(204).end(): next()
 }

//  Editar Usuario
const editOne = async(req, res, next)=>{
    if(notNumber(req.params.id, next)) return;
    const dbResponse = await editUser(+req.params.id, {...req.body})
    if(dbResponse instanceof Error) return  next(dbResponse)
    dbResponse.affectedRows ? res.status(204).end(): next()
}



// Exporto Controllers
module.exports = {listAll, getOne, newOne, removeOne, editOne}