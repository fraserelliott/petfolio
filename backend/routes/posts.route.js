// Import mini express library //
const app = require("express").Router();
// Import config file //
const sequelize = require("../config/connections");
// Import post model file //
const { Posts } = require("./models/posts");
// Import auth file //
const { signToken, authmiddleware } = require("./utils/auth");



app.get ("/", async (req, res) => {
    try {
const post = await Posts.findAll(Posts);  
res.status(200).json({post})
} catch (error) {
    res.status(500).json({error:error.message})
}
});

// Create a get request to retrieve all posts //

// Trigger try //

// -> Define desired request body -> //

// -> Create response message //

// Trigger catch //

// Create error message //

// - - - Could add the image upload into the create post request? - - - //
app.post("/post", authmiddleware, async (req, res) => {
    try {
const { caption } = req.body
const post = await Posts.create({ caption }); 
res.status(200).json({message: "post added succesfully", post})
} catch (error) {
    res.status(500).json({error: error.message})
}
});

// Create a post request to add a post //

// Trigger try //

// -> Define desired request body -> //

// -> Create action to add data to database -> //

// -> Create response message //

// Trigger catch //

// Create error message //



app.post("/upload", authmiddleware, async (req, res) => {
try {
const { image } = req.body;
const post = await Posts.create(image);
res.status(200).json({message: "Image added succesfully", post})
} catch (error) {
    res.status(500).json({error: error.message})
}
});

// Create a post request to upload an image //

// Trigger try //

// -> Define desired request to add -> //

// -> Create action to add data -> //

// -> Creat erespons emessage //

// Trigger catch //

// Create error message //



// Create a delete request to delete a post //

// Trigger try //

// -> Define and locate data to be deleted -> //

// -> Create response message //

// Trigger catch //

// Create error message //



// Create a put request to update a post //

// Trigger try //

// -> Define desired request body to update -> //

// -> Create action to locate data to be updated -> //

// -> Create response message //

// Trigger catch //

// Create error message //



// Export module //
module.export = app;