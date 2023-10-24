require("dotenv/config");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const {CLOUD_NAME, API_KEY, API_SECRET} = require("../configs/cloudinary.config")

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: 'bestwishes'
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;