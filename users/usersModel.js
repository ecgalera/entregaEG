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

// Register new user
const registerNewUser = async (user)=>{
    const query =  `INSERT INTO users SET ?`
    try {
        return await pool.query(query, user)
    } catch (error) {
        error.message = error.code
        return error
    }
}
// Eliminar registro
const deleteUsers = async (id)=>{
        const query = `DELETE FROM users WHERE id = ${id}`
        try {
            return await pool.query(query)
        } catch (error) {
            error.message = error.code
            return error
        }
}

// Modificar Usuario
const editUser = async (id, user)=>{
    const query = `UPDATE users SET ? WHERE id = ${id}`
    try {
        return await pool.query(query, user)
    } catch (error) {
        error.message = error.code
        return error
    }
}




// Exportar a Controllers
module.exports = {getAllUsers, getUserById, registerNewUser, deleteUsers, editUser}