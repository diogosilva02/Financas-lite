const User = require("../models/User");

async function createTestUser(req, res) {
  try {
    const dataUser = await User.create({
      name: "Diogo",
      email: "diogosilva@yahoo.com",
      passwordHash: "1234",
    });

    res.json(dataUser);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
}

module.exports = { createTestUser };
