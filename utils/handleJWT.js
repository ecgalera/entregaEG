const jwt = require("jsonwebtoken")
const jwt_secret = process.env.jwt_secret

// Función para firmar token 
const tokenSign = async (user, time)=>{
    return jwt.sign(user, jwt_secret, {expiresIn: "1h"})
}


// Función para verificar token
const tokenVerify = async (token)=>{
    try {
        return jwt.verify(token, jwt_secret)
    } catch (error) {
        return error
    }
}

module.exports = {tokenSign, tokenVerify}