const express = require("express");
const jwt = require('jsonwebtoken');
const siteModel = require('../Models/siteModel');
const tokenVerify = require('../Middleware/tokenVerfiy');

const addSite = async (req, res) => {
    try {
        // const decoded = tokenVerify(req);
        // if (!decoded) {
        //     return res.status(401).json({ message: 'Unauthorized: Mising token' });
        // }
        const { logo, title, description, address, email,altemail, phone,altphone, facebook, instagram, twitter, linkedin, youtube, whatsapp,map } = req.body;
      

        const siteData = new siteModel({
            logo,
            title,
            description,
            address,
            email,
            altemail,
            phone,
            altphone,
            facebook,
            instagram,
            twitter,
            linkedin,
            youtube,
            whatsapp,
            map,
            status: 1
        });

        await siteData.save();

        res.status(200).json({
            success: true,
            message: "Site Add Successfully",
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

const getSite = async (req, res) => {
    try {
        // const decoded = tokenVerify(req);
        // if (!decoded) {
        //     return res.status(401).json({ message: 'Unauthorized: Missing token' });
        // }

        const site = await siteModel.findOne();
        if (!site) {
            return res.status(404).json({ message: 'Site not found' });
        }

        res.status(200).json({
            success: true,
            message: "Site fetched successfully",
            data: site
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
        console.error('Error in getSite:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const updateSite = async (req, res) => {
    try {
        // const decoded = tokenVerify(req);
        // if (!decoded) {
        //     return res.status(401).json({ message: 'Unauthorized: Missing token' });
        // }
        

        const {
            siteId,
            title,
            description,
            address,
            email,
            altemail,
            phone,
            altphone,
            facebook,
            instagram,
            twitter,
            linkedin,
            youtube,
            whatsapp,
            map
        } = req.body;

        let logo = req.body.logo; // fallback if no new image uploaded
        if (req.file) {
            logo = `${req.file.filename}`; // path to saved file
        }

        const updatedSite = await siteModel.findByIdAndUpdate(
            siteId,
            {
                logo,
                title,
                description,
                address,
                email,
                altemail,
                phone,
                altphone,
                facebook,
                instagram,
                twitter,
                linkedin,
                youtube,
                whatsapp,
                map,
                status: 1
            },
            { new: true }
        );

        if (!updatedSite) {
            return res.status(404).json({ message: 'Site not found' });
        }

        res.status(200).json({
            success: true,
            message: "Site updated successfully",
            data: updatedSite
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
        console.error('Error in updateSite:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addSite,
    updateSite,
    getSite
}