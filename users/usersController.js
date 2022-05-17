// Importo Models 
const {getAllUsers, getUserById, registerNewUser, deleteUsers, editUser, loginUser} = require("./usersModel")
const notNumber = require("../utils/notNumber")
const {hashPassword, checkPassword} = require("../utils/handlePassword")
const {tokenSign, tokenVerify} = require("../utils/handleJWT")


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
const newOne = async (req, res, next)=>{

    const image = `${process.env.public_url}/${req.file.filename}`
    const password = await hashPassword(req.body.password)
    const dbResponse = await registerNewUser({...req.body, password, image})
    if(dbResponse instanceof Error) return next(dbResponse) 
    const user = {
        id: req.body.id,
        nombre: req.body.nombre,
        }
    const tokenData ={
        token: await tokenSign(user, "2h"),
        user: user
    }
    res.status(201).json({message: `User ${req.body.nombre} created!! `, JWT: tokenData })
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
    // me traje esta parte de crear un usuario image - password
    const image = `${process.env.public_url}/${req.file.filename}`
    const password = await hashPassword(req.body.password)
    const dbResponse = await editUser(+req.params.id, {...req.body,password, image})
    if(dbResponse instanceof Error) return  next(dbResponse)
    dbResponse.affectedRows ? res.status(200).json({message: `User ${req.body.nombre} changed!!`}): next()
}

// Login del Usuario
const login = async(req, res, next)=>{
    const dbResponse = await loginUser(req.body.email)
    if(!dbResponse.length) return next()
    const passwordMatch = await checkPassword(req.body.password, dbResponse[0].password)
    if(passwordMatch){
            const user= {   id: dbResponse[0].id,
                            nombre: dbResponse[0].nombre,
                            email: dbResponse[0].email
                        }
        const tokenData ={
            token: await tokenSign(user, "2h"),
            user: user
        }

        res.status(200).json({message: "Authorized", JWT: tokenData})
    }else{
        let error = new Error
        error.message = "Unauthorized"
        error.status = 401
        next(error)
    }
}
// Creamos el transporte de nodemailer para el servicio de mailtrap
const nodemailer = require("nodemailer")
var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.mail_user,
      pass: process.env.mail_pass
    }
  });



  // Forgot Password (a esta ruta va a llegar reciviendo el email)

const forgot = async (req, res, next)=>{
    const dbResponse = await loginUser(req.body.email)
    if(!dbResponse.length) return next()
    const user = {
        id: dbResponse[0].id,
        nombre: dbResponse[0].nombre,
        email: dbResponse[0].email
    }
    const token = await tokenSign(user, "15m")
    const link = `${public_url}/users/reset/${token}`
    
    let mailDetails = {
        from: "tech.support@splinter",
        to: user.email,
        subject: "Password Recovery with magic link",
        html: `<h2> Password Recovery Service</h2>
        <p> To reset your password, please click the link and follow instructions</p>
        <a href= "${link}"> click to recover your password</a> `
    }

    transport.sendMail(mailDetails, (err, data)=>{
        if(error){
            error.message = "Internal Server Error"
            res.next(error)
        }else{
            res.status(200).json({message: `Hi ${user.nombre}, we ve sent an email instructions to ${user.email}... Hurry up!`})
        }
    })

}

// Reset password
const reset = async(req, res, next)=>{
    const {token}= req.params
    const tokenStatus = await tokenVerify(token)
    if(tokenStatus instanceof Error){
        res.send(tokenStatus)
    }else{
        res.render("reset", {tokenStatus, token})
    }
}

const saveNewPass = ()=>{}

// Exporto Controllers
module.exports = {listAll, getOne, newOne, removeOne, editOne, login, forgot, reset, saveNewPass}

