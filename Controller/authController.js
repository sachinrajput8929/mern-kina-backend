const express = require("express");
const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const encrypt = require('encrypt');

const authRegister = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password before saving
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
      gender,
      status: "1", 
      loginrole: "admin",  
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

const getUser = async (req, res) => {
  try {
    // const decoded = tokenVerify(req);

    const getData = await userModel.find();
    res.status(200).json({
      success: true,
      message: "User Add Successfully",
      Users: getData,
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
    console.error("Error in addProduct:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await userModel.findOne({ email });
  if (!user) {
  return res.status(404).json({ success: false, message: "Email is not registered" });
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
      { userId: user._id, userName: user.name, userEmail: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // const tokenEncrypt = encrypt(token);

    res.status(200).json({
      success: true,
      message: "User Logged in Successfully!",
      userToken: token,
    });
  } catch (error) {
    console.error("Error in authRegister:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    // const decoded = tokenVerify(req);
    // if (!decoded) {
    //     return res.status(401).json({ message: 'Unauthorized: Missing token' });
    // }
    const { id } = req.params;
    // Validate id
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid or missing User ID" });
    }
    const deletedUser = await userModel.deleteOne({
      _id: id,
    });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
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
    console.error("Error in deletedUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  authRegister,
  authLogin,
  getUser,
  deleteUser,
};
