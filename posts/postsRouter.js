const router = require("express").Router()
const { validatorCreatePost } = require("../validators/posts")
const isAuth = require("../utils/isAuth")
const {addOnePosts, listAll} = require("./postsController")

router.post("/", isAuth, validatorCreatePost, addOnePosts)

router.get("/", listAll)

module.exports = router