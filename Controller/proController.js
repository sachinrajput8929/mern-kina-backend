const express = require("express");
const jwt = require('jsonwebtoken');
const proModel = require('../Models/proModel');
const tokenVerify = require('../Middleware/tokenVerfiy');

const addProduct = async (req, res) => {
    try {
        // const decoded = tokenVerify(req);
        // if (!decoded) {
        //     return res.status(401).json({ message: 'Unauthorized: Mising token' });
        // }
        const { name, desc, price, size, length, sleevs, color, fabric, styleCode, dressNumber,type } = req.body;
        const image = req.file ? req.file.filename : '';
        // console.log(image);

        const proData = new proModel({
            image,
            name,
            desc,
            price,
            size,
            length,
            sleevs,
            color,
            fabric,
            styleCode,
            dressNumber,
            type,
            status: 1
        });

        await proData.save();

        res.status(200).json({
            success: true,
            message: "Product Add Successfully",
        });

    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        if (error.message === 'TokenMissingOrMalformed') {
            return res.status(401).json({ message: 'Unauthorized: Token is missing or malformed' });
        }
        console.error('Error in addProduct:', error);
        return res.status(500).json({ message: 'Internal server error' });

    }
}

const getProduct = async (req, res) => {
    try {
        // const decoded = tokenVerify(req);
        const getData = await proModel.find() ;
        // or same query
        // const getData = await proModel.find({ status: { $in: [0, 1] } });

        res.status(200).json({
            success: true,
            message: "Product Add Successfully",
            Products: getData
        });

    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        if (error.message === 'TokenMissingOrMalformed') {
            return res.status(401).json({ message: 'Unauthorized: Token is missing or malformed' });
        }
        console.error('Error in addProduct:', error);
        return res.status(500).json({ message: 'Internal server error' });

    }
}

const getProbyId = async (req, res) => {
    try {
        // const decoded = tokenVerify(req);

        const { proid } = req.body;
        // Validate proid
        if (!proid || typeof proid !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Invalid or missing product ID'
            });
        }


        const product = await proModel.findOne({ _id: proid, status: 1 })
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found or inactive'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            product: product
        });

    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        if (error.message === 'TokenMissingOrMalformed') {
            return res.status(401).json({ message: 'Unauthorized: Token is missing or malformed' });
        }
        console.error('Error in addProduct:', error);
        return res.status(500).json({ message: 'Internal server error' });

    }
}

const getProbyIdUpdate = async (req, res) => {
    try {
        // tokenVerify(req);
        const { proid, name,price, desc, size, length, sleevs, color, fabric, styleCode, dressNumber,type } = req.body;

        const updatedProduct = await proModel.findOneAndUpdate(
            { _id: proid },
            { name,price, desc, size, length, sleevs, color, fabric, styleCode, dressNumber,type },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product: updatedProduct
        });

    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        if (error.message === 'TokenMissingOrMalformed') {
            return res.status(401).json({ message: 'Unauthorized: Token is missing or malformed' });
        }
        console.error('Error in addProduct:', error);
        return res.status(500).json({ message: 'Internal server error' });

    }
}


//ACTIVE AND INACTIVE STATUS
const updateProductStatus = async (req, res) => {
  try {
    const { proid, status } = req.body;
console.log("baaaakkkkkkk",req.body);
    // Validation
    if (!proid || typeof status === "undefined") {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }
     // Update status
    const updatedProduct = await proModel.findByIdAndUpdate(
      { _id: proid },
      { status },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product status updated",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};






const proDelete = async (req, res) => {
  try {
    const { proid } = req.params; // ✅ Get proid from URL params
    console.log("Deleting product with ID:", proid);

    const deletedProduct = await proModel.deleteOne({ _id: proid });

    if (deletedProduct.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);

    // Optional: Token-related errors if you re-enable tokenVerify(req)
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized: Token expired' });
    }
    if (error.message === 'TokenMissingOrMalformed') {
      return res.status(401).json({ message: 'Unauthorized: Token is missing or malformed' });
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
};




module.exports = {
    addProduct,
    getProduct,
    getProbyId,
    getProbyIdUpdate,
    updateProductStatus,
    proDelete
}