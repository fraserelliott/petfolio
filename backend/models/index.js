const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const { sequelize } = require('../config/connection');
const { DataTypes } = require("sequelize");

// Junction table for following
const Follow = sequelize.define(
  'follows',
  {
    followerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    followingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['followerId', 'followingId'], // unique composite key
      },
    ],
  }
);

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

User.belongsToMany(User, {
  through: Follow,
  as: 'following',
  foreignKey: 'followerId',
  otherKey: 'followingId'
});

module.exports = { User, Post, Comment, Follow };