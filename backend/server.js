require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const port = process.env.PORT || 3000;

async function startServer() {
  await connectDB();

  app.listen(port, () => {
    
    console.log(`rodando na porta ${port}`);
  });
}

startServer();
