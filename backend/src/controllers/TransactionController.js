const Transaction = require("../models/Transaction");

async function list(req, res) {
  try {
    const userId = req.user.id;

    const transacoes = await Transaction.find({ userId }).sort({
      data: -1,
    });

    return res.json(transacoes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Erro ao listar transações" });
  }
}

async function create(req, res) {
  try {
    const userId = req.user.id;

    const { descricao, valor, tipo, categoria, data } = req.body;

    if (!descricao || valor <= 0 || !tipo || !categoria || !data) {
      return res
        .status(400)
        .json({ erro: "Preencha todos os campos corretamente" });
    }

    const novaTransacao = await Transaction.create({
      userId,
      descricao,
      valor: Number(valor),
      tipo,
      categoria,
      data: new Date(data),
    });

    return res.status(201).json(novaTransacao);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar transação" });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { descricao, valor, tipo, categoria, data } = req.body;

    if (!descricao || valor <= 0 || !tipo || !categoria || !data) {
      return res
        .status(400)
        .json({ erro: "Preencha todos os campos corretamente" });
    }

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: id, userId },
      {
        descricao,
        valor: Number(valor),
        tipo,
        categoria,
        data: new Date(data),
      },
      {
        new: true,
      },
    );

    if (!updatedTransaction) {
      return res.status(404).json({ erro: "Transacao nao encontrada" });
    }

    return res.json(updatedTransaction);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao atualizar a transação" });
  }
}

async function remove(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const deletedTransaction = await Transaction.deleteOne({
      _id: id,
      userId,
    });

    if (deletedTransaction.deletedCount === 0) {
      return res.status(404).json({ erro: "Transacao nao encontrada" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao deletar a transação" });
  }
}

module.exports = { list, create, update, remove };
