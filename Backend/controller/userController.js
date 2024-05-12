
const express = require('express');
const userModel = require('../model/user.js');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { username, password, email } = req.body
        if (!(username && password && email)) {
            return res.status(400).send("all fields are compulosry")
         }
         const existingUser = await userModel.findOne({ email })
         if (existingUser) {
            return res.status(401).send("user already exists with this email")
         }
         const user = await userModel.create({username, password, email})
         const exist = await userModel.find({email})
        
        
       return res.status(201).send({message:"User Registered successfully",data : exist})

    } catch (error) {
        return res.status(400).send({"error":error.message})
    }
}
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body
        if (!email) {
           return res.status(400).send({ message: "Email Id is required!" })
        }
        if (!password) {
            return res.status(400).send({ message: "Password is required!" })
         }
        const exist =  await userModel.findOne({ email })
            // console.log('df');
        if(!exist){
           return res.status(400).send({message:"User not found"})
        }
        if(exist.password != password){
           return res.status(400).send({message: "Wrong Password"})
        }
        const token = jwt.sign(email,"shhhhhh")
        return res.status(200).send({message: "logged successful",data:{"token":token,expiresIn:1000*60*5,"userID":exist._id}})       

    }
    catch (err) {
        console.log(err)
        return res.status(400).send({error:err.message})
    }
}
