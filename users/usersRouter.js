const router = require("express").Router();
// Importar Controllers

router.get("/");

router.get("/:id")

router.post("/register");

router.post("/login")

router.delete("/:id")

router.post("/forgot-password")

router.get("/reset/:token")

router.post("/reset/:token")

module.exports = router