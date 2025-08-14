const { sequelize } = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Post extends Model { }

Post.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:
    {
      isUrl: true,
      len: [10, 500]
    }
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  postedBy: {
    type: DataTypes.UUID,
    allowNull: false,
  }
},
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "posts"
  }
);

module.exports = Post;