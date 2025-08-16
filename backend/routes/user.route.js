// Import express mini libraray // 
const app = require("express").Router();
// Import user model file //
const { User } = require("../models")
// Import auth file // 
const { signToken, authmiddleware } = require("../utils/auth");
const bcrypt = require('bcrypt');


app.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email: email.trim().toLowerCase(), password });
    const userData = newUser.get({ plain: true });
    delete userData.password;
    res.status(201).json(userData);
  } catch (error) {
    console.error("Error adding user: ", error);
    res.status(500).json({ error: "Error adding user" })
  }
});

// Initiate post to add/register user //

// Trigger try //

// Define desired data to be added //

// Define token //

// Create response message // 

// Trigger catch //

// Create error message //



app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email.trim().toLowerCase() } });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: "Invalid email address or password. " });

    const token = await signToken(user);
    res.status(200).json({ token, id: user.id });
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).json({ error: "Error logging in" })
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