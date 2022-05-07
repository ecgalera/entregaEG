const router = require("express").Router();
const {listAll, getOne, newOne, removeOne, editOne} =require("./usersController")
// Importar Controllers

router.get("/", listAll);

router.get("/:id", getOne);

router.post("/", newOne);

router.patch("/:id", editOne )

router.delete("/:id", removeOne);

// router.post("/forgot-password")

// router.get("/reset/:token")

// router.post("/reset/:token")

module.exports = router