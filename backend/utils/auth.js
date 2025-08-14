// Import jsonwebtoken library //
const JWT = require("jsonwebtoken");

// Define the token //
const expiration = "2 hr";

// Initiate authmiddleware function //
const authmiddleware = (req, res, next) => {

  // Locate the token //
  let token = req.headers.authorization;

  if (!token || typeof token !== 'string') {
    return res.status(401).json({ message: 'No token provided' });
  }

  token = token.split(' ').pop().trim();

  // Trigger try //
  try {
    // Verify the token //
    console.log(token);
    const data = JWT.verify(token, process.env.JWT_SECRET);
    // Label the token //
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

