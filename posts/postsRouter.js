const router = require("express").Router()
const isAuth = require("../utils/isAuth")
const {addOnePosts} = require("./postsController")

router.post("/", isAuth, addOnePosts)


module.exports = router