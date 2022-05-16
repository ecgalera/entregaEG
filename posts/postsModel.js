const pool = require("../db/config")

const getAllPosts = async()=>{
    const query = "SELECT * FROM posts"
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
    }
}


const newPosts = async(post)=>{
    const query = "INSERT INTO posts SET ?"
    try {
        return await pool.query(query, post)
    } catch (error) {
        error.message= error.code
    }
}

const getPostsWith = async(string)=>{
    const query = ` SELECT * FROM posts WHERE title LIKE "%${string}%"`
    try {
        return await pool.query(query)
    } catch (error) {
        error.message= error.code
    }
}

module.exports = {getAllPosts,newPosts, getPostsWith}