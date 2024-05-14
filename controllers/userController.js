const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Please provide email and password",
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid username or password"
            });
        }

        return res.status(200).send({
            success: true,
            user,
            message: "Login successful",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in login callback",
            error: error.message,
        });
    }
}


exports.registerController = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please fill all fields",
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ userName, email, password: hashedPassword }); // Use hashedPassword instead of password

        await newUser.save();

        return res.status(200).send({
            success: true,
            message: "User created successfully",
            user: newUser
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error while registering user",
            error: error.message, // Send error message for debugging
        });
    }
};
