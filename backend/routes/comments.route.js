// Import express mini library //
const app = require("express").Router();
// Import model file //
const { Comments } = require("../models/comments")
// Import auth file //
const { authmiddleware } = require("../utils/auth");



app.get("/", async (req, res) => {
    try{
    const comments = await Comments.findAll();
    res.status(200).json({comments});
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



app.post("/", authmiddleware, async (req, res) => {
    try {
    const { text, posts_id } = req.body;
    const comments = await Comments.create({ text, posts_id, commenterId: req.user.id});
    res.status(201).json({comments});
    } catch (error) {
        res.status(400).json({error:error.message})
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
module.exports = app;
