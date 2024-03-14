const { Router } = require("express");
const {
  userGet,
  userPost,
  userDelete,
  userPut,
  userPatch,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", userGet);
router.post("/", userPost);
router.delete("/", userDelete);
router.put("/:id", userPut);
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
