const { Router } = require("express");
const { check } = require("express-validator");

const { validateJWT, validateFields, isAdminRole } = require("../middlewares");

const {
  categoryPost,
  categoriesGet,
  categoryGet,
  categoryUpdate,
  categoryDelete,
} = require("../controllers/categories.controller");
const { categoryByIdExist } = require("../helpers/db-validators");

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get("/", categoriesGet);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(categoryByIdExist),
    validateFields,
  ],
  categoryGet
);

// Crear categoria - privado - cualquier persona con un token válido
router.post(
  "/",
  [
    validateJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validateFields,
  ],
  categoryPost
);

// Actualizar - privado - cualquiera con token válido
router.put(
  "/:id",
  [
    validateJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(categoryByIdExist),
    validateFields,
  ],
  categoryUpdate
);

// Borrar una categoria - Admin
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(categoryByIdExist),
    validateFields,
  ],
  categoryDelete
);

module.exports = router;
