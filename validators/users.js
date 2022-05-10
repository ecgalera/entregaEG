const {check, validationResult} =require("express-validator")

const validatiorCreateUser =[
    check("nombre")
        .trim()
        .notEmpty().withMessage("El campo no debe estar vacio")
        .isAlpha("es-ES", {ignore:" "}).withMessage("Solo letras")
        .isLength({min:2, max:90}).withMessage("Caracteres minmos:2 y maximo:90"),
    check("apellido")
        .trim()
        .notEmpty().withMessage("El campo no debe estar vacio")
        .isAlpha("es-ES", {ignore:" "}).withMessage("Solo letras")
        .isLength({min:2, max:90}).withMessage("Caracteres minmos:2 y maximo:90"),
    check("email")
        .trim()
        .notEmpty().withMessage("El campo no debe estar vacio")
        .isLength({min:8, max:25}).withMessage("Caracteres minmos:2 y maximo:90")
        .normalizeEmail(),
    check("password")
        .trim()
        .notEmpty().withMessage("El campo no debe estar vacio")
        .isLength({min:6, max:15}).withMessage("Caracteres minmos:6 y maximo:15"),
    (req, res, next)=>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(400).send({error: error.array()})
        }
    }
]

module.exports = {validatiorCreateUser}