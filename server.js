const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config,js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.authPath = "/api/auth";
    this.userPath = "/api/users";
    this.categoriesPath = "/api/categories";
    this.connectDb();
    // Middlewares
    this.middlewares();
    // Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    // lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));
  }

  async connectDb() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.authPath, require("./routes/auth"));
    this.app.use(this.userPath, require("./routes/users"));
    this.app.use(this.categoriesPath, require("./routes/categories"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
