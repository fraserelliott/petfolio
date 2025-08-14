// Import model files //
const { Posts, User, Comments } = require("./models");

// Define hasmany for user/posts //

User.hasMany(Posts) = {
    // Create sequelize options //
foriegnkey:"userId",
as:"posts"
};

// Define belongto for user/posts //
Posts.belongsTo(User) = {
    // Create sequelize options //
    foriegnkey:"postId",
    as:"user"
    };

// Define hasmany for posts/comments //
Posts.hasMany(Comments) = {
    // Create sequelize options //
    foriegnkey:"postId",
    as:"comments"
    };

// Define belongsto for posts/comments //
Comments.belongsTo(Posts) = {
    // Create sequelize options //
    foriegnkey:"commentsId",
    as:"posts"
    };

// Module export //
module.export = { Posts, User, Comments};