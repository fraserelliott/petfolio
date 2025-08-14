const { sequelize } = require("../config/connection");

// Import express tools //
const { Model, DataTypes } = require("sequelize");
// Create container for database //
class Posts extends Model { }
// Create columns for database using init //
Posts.init({
  // Create data //
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

// Export module //
module.exports = Posts;
