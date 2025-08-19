const app = require("express").Router();
const { Post, User } = require("../models")
const { authmiddleware } = require("../utils/auth");

app.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        as: "author",
        attributes: ["id", "avatar", "name"]
      }
    });
    res.status(200).json(posts)
  } catch (error) {
    console.error("Error retrieving posts: ", error);
    res.status(500).json({ error: "Error retrieving posts" })
  }
});

app.post("/", authmiddleware, async (req, res) => {
  try {
    const { caption, image } = req.body
    const post = await Post.create({ caption, image, postedBy: req.user.id });
    res.status(201).json(post)
  } catch (error) {
    console.error("Error adding post: ", error);
    res.status(500).json({ error: "Error adding post" })
  }
});

app.put("/:id", authmiddleware, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post)
      return res.status(404).json({ error: "Post not found." });

    if (post.postedBy !== req.user.id)
      return res.status(403).json({ error: "Unauthorised action" });

    const { caption, image } = req.body;
    await post.update({ caption, image });
    res.status(200).json(post);
  } catch (error) {
    console.error("Error updating post: ", error);
    res.status(500).json({ error: "Error updating post" })
  }
});

app.post("/like/:id", authmiddleware, async (req, res) => {
  try {
    const [affectedCount] = await Post.increment('likes', {
      by: 1,
      where: { id: req.params.id }
    });

    if (affectedCount === 0)
      return res.status(404).json({ error: "Post not found" });

    const post = await Post.findByPk(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    console.error("Error liking post: ", error);
    res.status(500).json({ error: "Error liking post" });
  }
});

app.delete("/:id", authmiddleware, async (req, res) => {
  try {
    const deletedCount = await Post.destroy({
      where: {
        id: req.params.id,
        postedBy: req.user.id
      }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Post not found or unauthorized" });
    }

    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post: ", error);
    res.status(500).json({ error: "Error deleting post" });
  }
});

// Export module //
module.exports = app;