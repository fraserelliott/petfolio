const { sequelize } = require("../config/connection");
const { Model, DataTypes } = require("sequelize")

class Comment extends Model { };

Comment.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  commenterId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  postsId: {
    type: DataTypes.UUID,
    allowNull: false,
  }
}, {
  sequelize,
  timestamps: true,
  underscored: true,
  modelName: "comments"
});

module.exports = Comment;