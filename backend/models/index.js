// Import model files //
const { Posts, User, Comments } = require("./models");

// Define hasmany for user/posts //

User.hasMany(Posts) = {
  // Create sequelize options //
  foreignKey: "userId",
  as: "posts"
};

// Define belongto for user/posts //
Posts.belongsTo(User) = {
  // Create sequelize options //
  foreignKey: "userId",
  as: "user"
};

// Define hasmany for posts/comments //
Posts.hasMany(Comments) = {
  // Create sequelize options //
  foreignKey: "postId",
  as: "comments"
};

// Define belongsto for posts/comments //
Comments.belongsTo(Posts) = {
  // Create sequelize options //
  foreignKey: "postId",
  as: "posts"
};

// Module export //
module.exports = { Posts, User, Comments };