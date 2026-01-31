require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

async function startServer() {
  await connectDB();

  app.listen(3000, () => {
    console.log("acessar http://localhost:3000");
    console.log("rodando na porta 3000");
  });
}

startServer();
