const { response } = require("express");
const { Category } = require("../models");

const categoriesGet = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { estado: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "nombre")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    categories,
  });
};

const categoryGet = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "nombre");

  res.json(category);
};

const categoryPost = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoryDB = await Category.findOne({ nombre });

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoria ${categoryDB.nombre}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    nombre,
    user: req.user._id,
  };

  const category = new Category(data);

  // Guardar DB
  await category.save();

  res.status(201).json(category);
};

const categoryUpdate = async (req, res = response) => {
  const { id } = req.params;
  const { estado, user, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json(category);
};

const categoryDelete = async (req, res = response) => {
  const { id } = req.params;
  const categoryDeleted = await Category.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(categoryDeleted);
};

module.exports = {
  categoryPost,
  categoriesGet,
  categoryGet,
  categoryUpdate,
  categoryDelete,
};
