const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  descricao: { type: String },
  valor: { type: Number },
  tipo: { type: String, enum: ["entrada", "saida"], required: true },
  categoria: { type: String, required: true, trim: true},
  data: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
