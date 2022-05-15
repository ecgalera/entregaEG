const pool = require("../db/config")

const newPosts = (posts)=>{
    const query = "INSERT INTO posts SET ?"
    try {
        return pool.query(query, posts)
    } catch (error) {
        error.message= error.code
    }
}

module.exports = {newPosts}