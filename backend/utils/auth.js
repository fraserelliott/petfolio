// Import jsonwebtoken library //
const jsonwebtoken = require("jsonwebtoken");

// Define the token //
const key = "myverysecuresecret";
const expiration = "2 hr";

// Initiate authmiddleware function //
const authmiddleware = (res, req, next) => {

    // Locate the token //
let token = req.body.token || req.query.token || req.header.authorization;

    // Parse token for server to read //
    if (token === req.header.authrotization) {
        token = token.split('').pop().trim(); 
        }

    // Create an error message //
    if (!token) {
res.status(500).json({error:"error finding token"})}

next();

// Trigger try //
try {

    // Verify the token //
const { data }= JWT.verify(token, key, {maxAge: expiration});
    // Label the token //
req.user = data;
} catch (error) {
    res.status(500).json({error:"error"}, error);
}
}

// Initiate signToken function //
const signToken = (user) => {
    // Create token content //
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar
    }
// Inject content //
return JWT.sign({ data: payload }, token,  {expires: expiration});
}

// Export module //
module.export = { signToken, authmiddleware };

