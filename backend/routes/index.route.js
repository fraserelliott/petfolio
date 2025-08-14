// Import mini express library //
const route = require("express").Router();
// Import route files seperately //
const routePost = require("./posts.route");
const routeUser = require("./user.route");
const routeComments = require("./comments.route");

// Create get request for health check //
route.get('/', async (req, res) => {
    try{
    res.status(200).json({message:"Welcome to the api"})
} catch (error) {
    res.status(500).json({error:error.message});
}
})

// Define middleware for each route file //

route.use('/posts', routePost);
route.use('/users', routeUser);
route.use('/comments', routeComments);

// Module export //
module.exports = route;