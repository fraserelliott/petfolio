const app = require("express").Router();
const { User, Follow } = require("../models")
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email.trim().toLowerCase() } });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: "Invalid email address or password." });

    const token = await signToken(user);
    res.status(200).json({ token, id: user.id });
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).json({ error: "Error logging in" })
  }
});

app.get("/", authmiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user)
      return res.status(404).json({ error: "User not found." })

    const userData = user.get({ plain: true });
    delete userData.password;
    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error getting user data: ", error);
    res.status(500).json({ error: "Error getting user data" })
  }
})

app.delete("/", authmiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user)
      return res.status(404).json({ error: "User not found." })

    await user.destroy();
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user: ", error);
    res.status(500).json({ error: "Error deleting user" })
  }
})

app.put("/", authmiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user)
      return res.status(404).json({ error: "User not found." })

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (avatar) updateData.avatar = avatar;
    if (password) updateData.password = password;

    await user.update({ name, email, avatar, password });
    const userData = user.get({ plain: true });
    delete userData.password;
    res.status(200).json(userData)
  } catch (error) {
    console.error("Error updating user data: ", error);
    res.status(500).json({ error: "Error updating user data" })
  }
})

app.get("/following", authmiddleware, async (req, res) => {
  try {
    const followerId = req.query.followerId || req.user.id;
    const following = await Follow.findAll({
      where: { followerId },
      attributes: ['followingId']
    });
    res.status(200).json(following.map(f => f.followingId));
  } catch (error) {
    console.error("Error getting following list: ", error);
    res.status(500).json({ error: "Error getting following list" })
  }
});

app.post("/following/:followingId", authmiddleware, async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.followingId;

    if (followerId === followingId) {
      return res.status(400).json({ error: "Cannot follow yourself" });
    }

    const followRecord = await Follow.create({ followerId, followingId });
    res.status(201).json(followRecord);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "Already following this user" });
    }
    console.error("Error adding following entry: ", error);
    res.status(500).json({ error: "Error adding following entry" })
  }
})

app.delete("/following/:followingId", authmiddleware, async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.followingId;

    const deleted = await Follow.destroy({
      where: { followerId, followingId }
    });

    if (deleted === 0) {
      return res.status(404).json({ error: "Follow relationship not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting following entry: ", error);
    res.status(500).json({ error: "Error deleting following entry" })
  }
})

module.exports = app;