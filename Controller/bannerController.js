const express = require("express");
const jwt = require("jsonwebtoken");
const bannerModel = require("../Models/bannerModel");
const tokenVerify = require("../Middleware/tokenVerfiy");

const addBanner = async (req, res) => {
  try {
    // const decoded = tokenVerify(req);
    // if (!decoded) {
    //     return res.status(401).json({ message: 'Unauthorized: Mising token' });
    // }
    const { alt, bannerURL } = req.body;
    const image = req.file ? req.file.filename : "";
    // console.log(image);

    const siteData = new bannerModel({
      image,
      alt,
      bannerURL,
      status: 1,
    });
    await siteData.save();

    res.status(200).json({
      success: true,
      message: "Banner Add Successfully",
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

const getBanner = async (req, res) => {
  try {
    // const decoded = tokenVerify(req);
    // if (!decoded) {
    //     return res.status(401).json({ message: 'Unauthorized: Mising token' });
    // }
    // const banners = await bannerModel.find({ status: 1 });

    const banners = await bannerModel.find().sort({ _id: -1 });
    if (!banners || banners.length === 0) {
      return res.status(404).json({ message: "No banners found" });
    }
    res.status(200).json({
      success: true,
      message: "Banners fetched successfully",
      BannerData: banners,
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

const getBannerById = async (req, res) => {
  try {
    // const decoded = tokenVerify(req);
    // if (!decoded) {
    //   return res.status(401).json({ message: "Unauthorized: Missing token" });
    // }
    const { id } = req.params;
    // Validate id
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid or missing banner ID" });
    }
    const banner = await bannerModel.findOne({ _id: id, status: 1 });
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.status(200).json({
      success: true,
      message: "Banner fetched successfully",
      data: banner,
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
};

const updateBanner = async (req, res) => {
  try {
    // const decoded = tokenVerify(req);
    // if (!decoded) {
    //   return res.status(401).json({ message: "Unauthorized: Missing token" });
    // }

    const { bannerId, alt, bannerURL } = req.body;
    let image = req.body.image; // fallback if no new image uploaded
    if (req.file) {
      image = `${req.file.filename}`; // path to saved file
    }

    // const { image } = req.file; // fallback if no new image uploaded
    if (!bannerId || typeof bannerId !== "string") {
      return res.status(400).json({ message: "Invalid or missing banner ID" });
    }
    const updatedBanner = await bannerModel.findByIdAndUpdate(
      bannerId,
      {
        image,
        alt,
        bannerURL,
        status: 1,
      },
      { new: true }
    );

    if (req.file) {
      console.log("New image uploaded:", req.file.filename);
      updatedBanner.image = req.file.filename;
    }

    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: updatedBanner,
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
    console.error("Error in updateBanner:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBanner = async (req, res) => {
  try {
    // const decoded = tokenVerify(req);
    // if (!decoded) {
    //     return res.status(401).json({ message: 'Unauthorized: Missing token' });
    // }
    const { id } = req.params;
    // Validate id
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid or missing banner ID" });
    }
    const deletedBanner = await bannerModel.deleteOne({
      _id: id,
    });
    if (!deletedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
      data: deletedBanner,
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
    console.error("Error in deleteBanner:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//ACTIVE AND INACTIVE STATUS
const updateBannerStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    // Validation
    if (!id || typeof status === "undefined") {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }
    // Update status
    const updatedProduct = await bannerModel.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    res.status(200).json({
      success: true,
      message: "Banner status updated",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addBanner,
  getBanner,
  getBannerById,
  updateBanner,
  deleteBanner,
  updateBannerStatus,
};
