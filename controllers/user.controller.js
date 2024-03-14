const { response, request } = require("express");

const userGet = (req = request, res = response) => {
  const { q, page = 1, limit = 10 } = req.query;
  res.json({
    msg: "get api",
    q,
    page: +page,
    limit: +limit,
  });
};

const userPost = (req, res = response) => {
  const { name, lastname } = req.body;
  res.json({
    msg: "post api",
    name,
    lastname,
  });
};

const userDelete = (req, res = response) => {
  res.json({
    msg: "delete api",
  });
};

const userPut = (req = request, res = response) => {
  const { id } = req.params.id;
  res.json({
    msg: "put api",
    id,
  });
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
