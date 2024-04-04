const { Router } = require("express");
const {
  userGet,
  userPost,
  userDelete,
  userPut,
  userPatch,
} = require("../controllers/users.controller");
const { check } = require("express-validator");
const {
  isRoleValid,
  emailExist,
  userByIdExist,
} = require("../helpers/db-validators");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../middlewares/validate-roles");

const router = Router();

router.get("/", userGet);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser de mas de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    // check("correo").custom((correo) => emailExist(correo)),
    check("correo").custom(emailExist),

    // check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    // check("rol").custom((role) => isRoleValid(role)),
    check("rol").custom(isRoleValid),

    validateFields,
  ],
  userPost
);
router.delete(
  "/:id",
  [
    validateJWT,
    // isAdminRole,
    hasRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID Válido").isMongoId(),
    // check("id").custom((id) => userByIdExist(id)),
    check("id").custom(userByIdExist),
  ],
  userDelete
);
router.put(
  "/:id",
  [
    check("id", "No es un ID Válido").isMongoId(),
    // check("id").custom((id) => userByIdExist(id)),
    check("id").custom(userByIdExist),
    check("rol").custom(isRoleValid),
    validateFields,
  ],
  userPut
);
router.patch("/:id", userPatch);

// router.post("/", function (req, res) {
//   res.status(201).json({
//     msg: "post api",
//   });
// });
// router.delete("/", function (req, res) {
//   res.json({
//     msg: "delete api",
//   });
// });
// router.put("/", function (req, res) {
//   res.json({
//     msg: "put api",
//   });
// });
// router.patch("/", function (req, res) {
//   res.json({
//     msg: "patch api",
//   });
// });

module.exports = router;
