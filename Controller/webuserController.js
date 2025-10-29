const express = require("express");
const webuserModel = require("../Models/webuserModel");
const proModel = require('../Models/proModel');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const existingUser = await webuserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password before saving
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new webuserModel({
      name,
      email,
      password:hashPassword,
      phone,
      status: "1",
      role: "user",
    });
    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in authRegister:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//user login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await webuserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email is not registered" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPassEnter = await bcrypt.compare(password, user.password);
    if (!isPassEnter) {
      return res
        .status(403)
        .json({ message: "Password incorrect", success: false });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        userRole: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // const tokenEncrypt = encrypt(token);

    res.status(200).json({
      success: true,
      message: "User Logged in Successfully!",
      webuserToken: token,
    });
  } catch (error) {
    console.error("Error in authRegister:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


//get by id fetch product
const getProductById = async (req, res) => {
    try {
     
      const { id } = req.params;
       // Validate id
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "Invalid or missing banner ID" });
      }
      const product = await proModel.findOne({ _id: id, status: 1 });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        data: product,
      });
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized: Token expired" });
      }
      if (error.message === "TokenMissingOrMalformed") {
        return res
          .status(401)
          .json({ message: "Unauthorized: Token is missing or malformed" });
      }
      console.error("Error in getBannerById:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
}









module.exports = {
  userRegister,
  userLogin,
  getProductById
};
