// Import mini express library //
const route = require("express").Router();
// Import route files seperately //
const routePost = require("./posts.route");
const routeUser = require("./user.route");
const routeComments = require("./comments.route");
// Import config file //
const sequelize = require("sequelize");

// Create get request for health check //
route.get('/api', async (req, res) => {
    try{
    res.status(200).json({message:"Welcome to the api"})
} catch (error) {
    res.status(500).json({error:error.message});
}
})

// Define middleware for each route file //

route.use('/api/posts', routePost);
route.use('/api/user', routeUser);
route.use('/api/comments', routeComments);

// Module export //
expport.module = route;