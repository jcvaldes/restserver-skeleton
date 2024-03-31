const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la DB`);
  }
};

const emailExist = async (correo = "") => {
  const user = await User.findOne({ correo });
  if (user) {
    throw new Error(`El correo ${correo} esta registrado`);
  }
};
const userByIdExist = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`El id no existe: ${id}`);
  }
};
module.exports = {
  isRoleValid,
  emailExist,
  userByIdExist,
};
