const router = require("express").Router();
const {listAll, getOne, newOne, removeOne, editOne, login} =require("./usersController")
const {validatiorCreateUser} =require("../validators/users")
const fileUpload = require("../utils/handleStorage")

// Importar Controllers

router.get("/", listAll);

router.get("/:id", getOne);
// fileUpload le tengo que indicar cuantos archivos voy a cargar uso single
router.post("/register", fileUpload.single("file"), validatiorCreateUser, newOne);

router.patch("/:id", fileUpload.single("file"), editOne )

router.delete("/:id", removeOne);

router.post("/login", login)

// router.get("/reset/:token")

// router.post("/reset/:token")

module.exports = router

