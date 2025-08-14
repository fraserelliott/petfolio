const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

// Associations
User.hasMany(Post, {
  foreignKey: 'postedBy',
  as: 'posts'
});

Post.belongsTo(User, {
  foreignKey: 'postedBy',
  as: 'author'
});

Post.hasMany(Comment, {
  foreignKey: 'postsId',
  as: 'postComments'
});

Comment.belongsTo(Post, {
  foreignKey: 'postsId',
  as: 'post'
});

User.hasMany(Comment, {
  foreignKey: 'commenterId',
  as: 'userComments'
});

Comment.belongsTo(User, {
  foreignKey: 'commenterId',
  as: 'commenter'
});

module.exports = { User, Post, Comment };