const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (rol = "") => {
  const role = await Role.findOne({ rol });
  if (!role) {
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

const categoryByIdExist = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error(`El id no existe: ${id}`);
  }
};
module.exports = {
  isRoleValid,
  emailExist,
  userByIdExist,
  categoryByIdExist,
};
