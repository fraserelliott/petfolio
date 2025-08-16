require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../config/connection");
const { User, Post, Comment, Follow } = require("../models");

// Create a helper to read JSON
const loadJSON = (fileName) => {
  const filePath = path.join(__dirname, "../../mocking", fileName);
  const rawData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(rawData);
};

const seed = async () => {
  try {
    // Make sure DB is connected
    await sequelize.sync({ force: true }); // wipes tables and recreates them

    // Seed Users
    const usersData = loadJSON("users.json");
    await User.bulkCreate(usersData, { validate: true, individualHooks: true });
    const follows = [];
    for (const user of usersData) {
      const numFollows = Math.floor((Math.random() * 5) + 1);
      const otherUserIds = usersData.map(u => u.id).filter(id => id !== user.id);
      // shuffle and take first numFollows
      const shuffled = otherUserIds.sort(() => 0.5 - Math.random());
      const followIds = shuffled.slice(0, numFollows);
      followIds.forEach(followingId => {
        follows.push({ followerId: user.id, followingId });
      });
    }

    await Follow.bulkCreate(follows);

    // Seed Posts
    const postsDataRaw = loadJSON("posts.json");
    const postsData = postsDataRaw.map(p => ({
      id: p.id,
      caption: p.caption,
      image: p.image,
      likes: p.likes,
      postedBy: p.posted_by,
      createdAt: p.created_at,
      updatedAt: p.created_at
    }));
    await Post.bulkCreate(postsData, { validate: true });

    // Seed comments
    const commentDataRaw = loadJSON("comments.json");
    const commentData = commentDataRaw.map(c => ({
      id: c.id,
      text: c.text,
      createdAt: c.created_at,
      commenterId: c.commenter_id,
      postsId: c.posts_id
    }));
    await Comment.bulkCreate(commentData, { validate: true });

    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seed();