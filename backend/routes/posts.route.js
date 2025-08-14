// Import mini express library //
const app = require("express").Router();
// Import post model file //
const { Post, User } = require("../models")
// Import auth file //
const { authmiddleware } = require("../utils/auth");

app.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({include: {
      model: User,
      as: "author",
      attributes: [ "id", "avatar", "name" ]
    }});
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

// Create a get request to retrieve all posts //

// Trigger try //

// -> Define desired request body -> //

// -> Create response message //

// Trigger catch //

// Create error message //

app.post("/", authmiddleware, async (req, res) => {
  try {
    const { caption, image } = req.body
    const post = await Post.create({ caption, image, postedBy: req.user.id });
    res.status(201).json({ message: "post added succesfully", post })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});

// Create a post request to add a post //

// Trigger try //

// -> Define desired request body -> //

// -> Create action to add data to database -> //

// -> Create response message //

// Trigger catch //

// Create error message //

// Create a post request to upload an image //

// Trigger try //

// -> Define desired request to add -> //

// -> Create action to add data -> //

// -> Creat erespons emessage //

// Trigger catch //

// Create error message //



// Create a delete request to delete a post //

// Trigger try //

// -> Define and locate data to be deleted -> //

// -> Create response message //

// Trigger catch //

// Create error message //



// Create a put request to update a post //

// Trigger try //

// -> Define desired request body to update -> //

// -> Create action to locate data to be updated -> //

// -> Create response message //

// Trigger catch //

// Create error message //



// Export module //
module.exports = app;