// src/utils/uploader.js
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const upload = multer({ storage: multer.memoryStorage() });

export const uploadToCloudinary = (buffer, folder = "fin-knowledge") =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder }, (err, res) => {
            if (err) reject(err); else resolve(res);
        });
        streamifier.createReadStream(buffer).pipe(stream);
    });
