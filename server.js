const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config,js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.userPath = "/api/users";
    this.authPath = "/api/auth";
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
    this.app.use(this.userPath, require("./routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
