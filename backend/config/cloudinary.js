import {v2 as cloudniary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';

const uploadOnCloudinary = async (filePath) => {
    cloudniary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        const uploadResult = await cloudniary.uploader.upload(filePath);
        fs.unlinkSync(filePath);
        return uploadResult.secure_url;
    } catch (error) {
        fs.unlinkSync(filePath);
        return { status: 500, message: "Cloudinary upload failed", error: error.message };
    }
};

export default uploadOnCloudinary;
