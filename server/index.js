//Archivo principal que inicia el servidor
require("dotenv").config(); //Carga la variables de entorno para que puedan ser usadas en todo el proyecto
const app = require("./src/app.js"); //Se importa app
const { conn } = require("./src/db.js"); //Se importa conn desde la base de datos

const PORT = 3001;

//conn.sync() para sincronizar los modelos de Sequelize con la base de datos
conn
  .sync({
    force: false,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server corriendo en 😎 ${PORT}`);
    });
  });
