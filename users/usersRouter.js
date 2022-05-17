const router = require("express").Router();
const {listAll, getOne, newOne, removeOne, editOne, login, forgot , reset, saveNewPass} =require("./usersController")
const {validatiorCreateUser, validatorResetPassword} =require("../validators/users")
const fileUpload = require("../utils/handleStorage");


// Importar Controllers

router.get("/", listAll);

router.get("/:id", getOne);
// fileUpload le tengo que indicar cuantos archivos voy a cargar uso single
router.post("/register", fileUpload.single("file"), validatiorCreateUser, newOne);

router.patch("/:id", fileUpload.single("file"), editOne )

router.delete("/:id", removeOne);

router.post("/login", login)

// Forgot password
 router.post("/forgot-password", forgot)

//  get de magic link
router.get("/reset/:token", reset)

router.post("/reset/:token", validatorResetPassword, saveNewPass)

// router.post("/reset/:token")

module.exports = router

