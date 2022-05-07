// Importar config.js de db
const pool = require("../db/config")
// get All Users 
const getAllUsers =async()=>{
    const query = "SELECT * FROM users"
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

// getUsersById
const getUserById = async (id)=>{
    const query = `SELECT * FROM users WHERE id = ${id}`
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

// Exportar a Controllers
module.exports = {getAllUsers, getUserById}