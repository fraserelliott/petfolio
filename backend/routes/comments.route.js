// Import express mini library //
const app = require("express").Router();
// Import model file //
const { Comments } = require("./models/comments")
// Import config file //
const sequelize = require("./config/connection");
// Import auth file //
const { signToken, authmiddleware } = require("./utils/auth");



app.get("/", async (req, res) => {
    try{
    const comments = await Comments.findAll(Comments);
    res.status(200).json({message:"here are your comments", comments});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

// Initaite a get request to retrive all comments //

// Trigger try //

// Define location and retrieve data // 

// Create response messasge //

// Trigger catch //

// Create error message //



app.post("/:post_id", authmiddleware, async (req, res) => {
    try {
    const { text } = req.body;
    const { posts_id } = req.query;
    const comments = await Comments.create({ text, posts_id});
    res.status(200).json({message:"comment added", comments});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

// Initaite a post request to add a comment //

// Trigger try //

// Define desired data to add // 

// Define location and retrieve data // 

// Create response messasge //

// Trigger catch //

// Create error message //


// Export module //
module.export = app;
