const router = require("express").Router();
const {listAll, getOne, newOne, removeOne, editOne, login} =require("./usersController")
const {validatiorCreateUser} =require("../validators/users")
// Importar Controllers

router.get("/", listAll);

router.get("/:id", getOne);

router.post("/",validatiorCreateUser, newOne);

router.patch("/:id", editOne )

router.delete("/:id", removeOne);

router.post("/login", login)

// router.get("/reset/:token")

// router.post("/reset/:token")

module.exports = router