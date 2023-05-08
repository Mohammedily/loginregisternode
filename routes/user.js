const express = require("express");
const userRouter = express.Router();
const User = require("../Models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/signup", async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"Please Enter All Field"});
    }

    const already = await User.findOne({email});


    if(already){
        return res.status(400).json({message: "Already Register Email, Please Login"});
    }

     const salt = await bcrypt.genSalt(Number(process.env.SALT));

     const hassedPassword = await bcrypt.hashSync(password, salt)

    let enteremail;

    try {
        enteremail = new User({
            email, password: hassedPassword
        })
    } catch (error) {
        return res.status(400).json({error, message: "Internal server error, Please check Internet"});
    }

    try {
        await enteremail.save();
    } catch (error) {
        return res.status(400).json({error, message: "Internal server error, Please check Internet"});
    }

     return res.status(200).json({enteremail, message:"User Register Successfully"})
});


userRouter.post("/signin", async(req, res) => {
    const {email, password} = req.body;


    if (!email) {
      return res.status(400).json({ message: 'Please Enter Email' });
    }
  
    if (!password) {
      return res.status(400).json({ message: 'Please Enter Password' });
    }
    
      let existing;
      try {
          existing = await User.findOne({email});
      } catch (error) {
          console.log(error);
      }
  
     if(!existing){
      return res.status(400).json({message: "Please Register, After Login"});
     }
  
     const comparePassword = await bcrypt.compareSync(password, existing.password);
  
  
     if(!comparePassword){
      return res.status(400).json({message: "Incorrect Password"});
     }
  
     const token = jwt.sign({_id: this._id}, process.env.JWTKEY ,
      {
          "expiresIn":"1h"
      })
  
      return res.status(200).json({data: token, message: "Login Sucessfully", user: existing});
    
  
});


module.exports = userRouter;
