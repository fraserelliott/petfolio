// Import config libraray //
const { sequelize } = require("../config/connection");
// Import express tools //
const { Model, DataTypes } = require("sequelize")

// Import config file //

// Use class model tool to create database container //
class Comments extends Model { };

// Use init tool to create database columns //
Comments.init = ({
  // Create data //
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  commenter_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  posts_id: {
    type: DataTypes.UUID,
    allowNull: false,
  }
},
{
  sequelize,
  timestamps: true,
  underscored: true,
  modelName: "comments"
})

// Export module //
module.exports = Comments;

