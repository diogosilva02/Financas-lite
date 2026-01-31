const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Conectado");
  } catch (error) {
    console.error("Erro no DB");

    process.exit(1);
  }
}

module.exports = connectDB;
