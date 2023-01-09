// npm i multer@1.4.5-lts.1 cloudinary@1.31.0 multer-storage-cloudinary@4.0.0
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const {CloudinaryStorage} = require("multer-storage-cloudinary");


// configura cloudinary

cloudinary.config ({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

// Instance of cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats:['jpg', 'png'],
    params: {
        folder: 'blog-api',
        transformation: [{width: 500, height: 500, crop: "limit"}],
    },
});

module.exports = storage;