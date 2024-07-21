const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
router.post("/register", async (req, res) => {
    try {
        // Take all information from the form
        const { firstName, lastName, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "User already exists" });

        // Hash the Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);


        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });

        // Save the User
        await newUser.save();

        // Send a successful message
        res.status(200).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
});
// User Login
router.post("/login",async(req,res)=>{
    try{
        // Take all information from the form
        const {email,password} = req.body;
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(409).json({ message: "User doesn't exists!" });

        // Compare hashed password with the entered password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) {
            return res.status(400).json({message : "Invalid Credentials"});
        }

        // Generate JWT token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        delete user.password;

        res.status(200).json({token,user})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:err.message})
    }
})

module.exports = router;
