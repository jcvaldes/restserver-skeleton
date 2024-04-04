const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { validationResult } = require("express-validator");

const userGet = async (req = request, res = response) => {
  // const { q, page = 1, limit = 10 } = req.query;
  // res.json({
  //   msg: "get api",
  //   q,
  //   page: +page,
  //   limit: +limit,
  // });

  const { limit = 5, from = 0 } = req.query;
  const query = { estado: true };

  // const users = await User.find(query).skip(Number(from)).limit(Number(limit));
  // const total = await User.countDocuments(query),

  // si una da error todas dan error
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const userPost = async (req, res = response) => {
  // const { name, lastname } = req.body;
  // res.json({
  //   msg: "post api",
  //   name,
  //   lastname,
  // });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { nombre, correo, password, rol } = req.body;
  const user = new User({ nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // verificar email existe: se hizo un helper
  // const existeEmail = await User.findOne({ correo });
  // if (existeEmail) {
  //   return res.status(400).json({
  //     msg: "Ese corre esta registrado",
  //   });
  // }

  // Guardar en BD
  await user.save();

  res.json({
    user,
  });
};

const userDelete = async (req, res = response) => {
  // res.json({
  //   msg: "delete api",
  // });
  const { id } = req.params;

  // Fisicamente lo borramos
  // const user = await User.findByIdAndDelete( id );

  const user = await User.findByIdAndUpdate(id, { estado: false });

  res.json(user);
};

const userPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto);

  res.json(user);
};
const userPatch = (req, res = response) => {
  // res.send("hello world");
  res.json({
    msg: "patch api",
  });
};
module.exports = {
  userGet,
  userPost,
  userDelete,
  userPut,
  userPatch,
};
