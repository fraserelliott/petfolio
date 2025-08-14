// Import express mini libraray // 
const app = require("express").Router();
// Import user model file //
const { User } = require("../models/comments")
// Import auth file // 
const { signToken, authmiddleware } = require("../utils/auth");
const bcrypt = require('bcrypt');


app.post("/", async (res, req) => {
  try {
    const user = {...req.body};
    user.email = user.email.trim().toLowerCase();
    const newUser = await User.create(user);

    const token = signToken(newUser);
    res.status(201).json({ message: "user has been registered", token, newUser });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});

// Initiate post to add/register user //

// Trigger try //

// Define desired data to be added //

// Define token //

// Create response message // 

// Trigger catch //

// Create error message //



app.post("/login", async (res, req) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({ where: { email: email.trim().toLowerCase() } });

    if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(401).json({ error: "Invalid username or password. "});

    const token = await signToken(user);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

// Initiate post to login user //

// Trigger try //

// Define and locate email input //

// Create if email not found // 

// Define and locate id input //

// Create if password not found // 

// Define token //

// Trigger catch //

// Create error message //


// Export module //
module.exports = app;