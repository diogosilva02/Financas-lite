const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

async function auth(req, res, next) {
  const readToken = req.headers.authorization;

  if (!readToken) {
    return res.status(401).json({ erro: "Token não informado" });
  }

  const resultToken = readToken.split(" ")[1];

  if (!resultToken) {
    return res.status(401).json({ erro: "Token mal formatado" });
  }

  try {
    const payload = jwt.verify(resultToken, secret);

    req.user = {
      id: payload.id,
      email: payload.email,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ erro: "Token invalido ou expirado" });
  }
}

module.exports = { auth };
