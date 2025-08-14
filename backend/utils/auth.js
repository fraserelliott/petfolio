// Import jsonwebtoken library //
const JWT = require("jsonwebtoken");

// Define the token //
const expiration = "2 hr";

// Initiate authmiddleware function //
const authmiddleware = (req, res, next) => {

  // Locate the token //
  let token = req.body.token || req.query.token || req.header.authorization;

  // Parse token for server to read //
  if (token === req.header.authorization) {
    token = token.split('').pop().trim();
  }

  // Create an error message //
  if (!token) {
    res.status(401).json({ error: "error finding token" })
  }

  // Trigger try //
  try {
    // Verify the token //
    const { data } = JWT.verify(token, process.env.JWT_SECRET, { maxAge: expiration });
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
  return JWT.sign({ data: payload }, token, { expires: expiration });
}

// Export module //
module.exports = { signToken, authmiddleware };

