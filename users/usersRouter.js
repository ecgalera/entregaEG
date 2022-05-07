const router = require("express").Router();
const {listAll, getOne} =require("./usersController")
// Importar Controllers

router.get("/", listAll);

router.get("/:id", getOne)

// router.post("/register");

// router.post("/login")

// router.delete("/:id")

// router.post("/forgot-password")

// router.get("/reset/:token")

// router.post("/reset/:token")

module.exports = router