const JWT = require("jsonwebtoken");
const { User } = require("../models/index");

const expiration = "2 hr";

const authmiddleware = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || typeof token !== 'string') {
    return res.status(401).json({ message: 'No token provided' });
  }

  token = token.split(' ').pop().trim();
  try {
    console.log(token);
    const data = JWT.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(data.id);
    if (!user) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }
    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({ error: "This endpoint requires authentication." }, error);
  }
}

// Initiate signToken function //
const signToken = (user) => {
  // Create token content //
  const payload = {
    id: user.id,
    name: user.name
  }
  // Inject content //
  return JWT.sign(payload, process.env.JWT_SECRET);
}

// Export module //
module.exports = { signToken, authmiddleware };

