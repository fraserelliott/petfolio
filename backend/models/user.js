// Import config file //
const sequelize = require("./conifg/connections")

// Import sequelize tools //
const { Module, DataTypes, Sequalize } = require("sequelize")

// Use class module tool create database container //
class User extends module {};

// Use init tool to create database columns //
User.init = {
    // Create data //
    id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    // - - - Only changed full_name to name in this user branch, the rest have full_name in the auth file, might be a problem? - - - // 
    name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

// Module export //

module.export = User;