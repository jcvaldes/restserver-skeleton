const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");

const { login, googleSignin } = require("../controllers/auth.controller");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  login
);
router.post(
  "/google",
  [check("id_token", "id_token es necesario").not().isEmpty()],
  googleSignin
);

module.exports = router;
