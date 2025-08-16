// Import express mini library //
const app = require("express").Router();
// Import model file //
const { Comment, User } = require("../models")
// Import auth file //
const { authmiddleware } = require("../utils/auth");



app.get("/", async (req, res) => {
  try {
    const postsId = req.query.postsId;
    const where = postsId ? { postsId } : {}
    const comments = await Comment.findAll({ where, include: [
    {
      model: User,
      as: 'commenter',
      attributes: ['id', 'name', 'avatar']
    }
  ] });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res.status(500).json({ error: "Error retrieving comments" });
  }
});

// Initaite a get request to retrive all comments //

// Trigger try //

// Define location and retrieve data // 

// Create response messasge //

// Trigger catch //

// Create error message //



app.post("/", authmiddleware, async (req, res) => {
  try {
    const { text, postsId } = req.body;
    const comment = await Comment.create({ text, postsId, commenterId: req.user.id });
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Error adding comment" });
  }
});

// Initaite a post request to add a comment //

// Trigger try //

// Define desired data to add // 

// Define location and retrieve data // 

// Create response messasge //

// Trigger catch //

// Create error message //


// Export module //
module.exports = app;
