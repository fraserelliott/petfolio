const { sequelize } = require("../config/connection")
const bcrypt = require('bcrypt');
const { Model, DataTypes } = require("sequelize")

class User extends Model { };

User.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
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
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          if (user.password && user.password.trim() !== "") {
            user.password = await bcrypt.hash(user.password, 10);
          } else {
            // If frontend sent empty password, keep the old one
            user.password = user.previous("password");
          }
        }
      },
    },
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "users"
  }
);

module.exports = User;