const { truncate } = require("fs/promises")

const notNumber = (id, next)=>{
    if(isNaN(+id)){
        let error = new Error("ID debe ser un numero")
        error.status = 400
        next(error)
        return true
    }else{
        return false
    }
}

module.exports = notNumber