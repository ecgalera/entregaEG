const bcrypt = require("bcrypt")
const saltRounds = 10

//  Hacemos dos funciones 
// Encriptamos 
const hashPassword = async (password)=>{
    return  await bcrypt.hash(password, saltRounds)

}

// Desencriptamos
const checkPassword = async (password, hashPassword)=>{
    return await bcrypt.compare(password, hashPassword)
}

module.exports = {hashPassword, checkPassword}