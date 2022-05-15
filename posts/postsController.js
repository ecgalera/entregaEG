const {newPosts} =require("./postsModel")

const addOnePosts = async (req, res, next)=>{
    res.status(200).json(req.user)
}



module.exports= {addOnePosts}