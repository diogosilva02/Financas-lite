const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ erro: "Preencheu errado" });
  }

  try {
    const searchEmail = await User.findOne({ email });
    if (searchEmail) {
      return res.status(409).json({ erro: "Email já cadastrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ erro: "Tem algo errado aqui" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ erro: "Preencha todos os campos " });
  }

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(401).json({ erro: "credenciais inválidas" });
    }

    const validationHash = await bcrypt.compare(
      password,
      foundUser.passwordHash,
    );

    if (!validationHash) {
      return res.status(401).json({ erro: "credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ erro: "erro no db" });
  }
}

module.exports = { register };
