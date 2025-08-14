// Import config file //
const sequelize = require("./config/connections")
const bcrypt = require('bcrypt');

// Import sequelize tools //
const { Model, DataTypes } = require("sequelize")

// Use class module tool create database container //
class User extends Model { };

// Use init tool to create database columns //
User.init({
  // Create data //
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  // - - - Only changed full_name to name in this user branch, the rest have full_name in the auth file, might be a problem? - - - // 
  name: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: "unique_email",
      msg: "Email must be unique"
    }
  },
  avatar: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8],
    },
  }
},
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "users"
  }
);

// Module export //

module.exports = User;