// Import express library //

// Import config file //
const sequelize = require("../config/connection");
// Import express tools //
const { Model, DataTypes } = require("sequelize");
// Create container for database //
class Posts extends Model {}
// Create columns for database using init //
Posts.init ({
    // Create data //
    id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    caption: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
            { isUrl:true,
            len: [10,500]
        }
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,

    },
    posted_by: {
        type: DataTypes.UUID,
        allowNull: false,

    }
});

// Export module //
module.export = Posts;
