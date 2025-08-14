// Import config libraray //
const sequelize = require("./config/connections");
// Import express tools //
const { Module, DataType, Sequelize } = require("sequelize")

// Import config file //

// Use class model tool to create database container //
class Comments extends Module {};

// Use init tool to create database columns //
Comments.init = ({
    // Create data //
    id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,

    },
    // Why do you need a commenter id if you get one by default at the top of the database? //
    commenter_id: {
        type: DataTypes.UUID,
        allowNull: false,

    },
    posts_id: {
        type: DataTypes.UUID,
        allowNull: false,

    }
})

// Export module //
module.export = Comments;

