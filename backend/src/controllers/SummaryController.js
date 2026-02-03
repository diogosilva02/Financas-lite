const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

async function get(req, res) {
  try {
    const userId = mongoose.Types.ObjectId(req.user.id);

    const pipeline = [
      { $match: { userId } },
      { $group: { _id: "$tipo", total: { $sum: "$valor" } } },
    ];

    const result = await Transaction.aggregate(pipeline);

    let entradas = 0;
    let saidas = 0;

    result.forEach((el) => {
      if (el._id === "entrada") entradas = el.total;
      if (el._id === "saida") saidas = el.total;
    });

    const saldo = entradas - saidas;

    return res.json({ entradas, saidas, saldo });
  } catch (error) {
    return res.status(500).json({ erro: "Erro na base de dados" });
  }
}

module.exports = { get };
