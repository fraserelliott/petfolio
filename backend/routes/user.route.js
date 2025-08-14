// Import express mini libraray // 
const app = require("express").Router();
// Import user model file //
const { User } = require("./models/comments")
// Import config file //
const sequelize = require("./config/connection");
// Import auth file // 
const { signToken, authmiddleware } = require("./utils/auth");


app.post("/", async (res, req) => {
    try {
        const user = await User.create(req.body);

        const token = signToken(user);
        res.status(200).json({message:"user has been registered", token, user});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

// Initiate post to add/register user //

// Trigger try //

// Define desired data to be added //

// Define token //

// Create response message // 

// Trigger catch //

// Create error message //



app.post("/login", async (res, req) => {
    try {
        const userEmail = await User.findOne({where: {email:req.body.email}});

        if (!userEmail) 
        res.status(500).json({error:"email can not be found"});

        const userId = await userEmail.findOne(req.body.id);

        if (!userId) 
            res.status(500).json({error:"Id can not be found"});

        const token = await signToken(userEmail);
        res.status(200).json({message:"Login successful", token, userEmail, userId});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

// Initiate post to login user //

// Trigger try //

// Define and locate email input //

// Create if email not found // 

// Define and locate id input //

// Create if password not found // 

// Define token //

// Trigger catch //

// Create error message //


// Export module //
module.export = app;