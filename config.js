const dotenv = require('dotenv');
dotenv.config()


const PORT = process.env.PORT ;
const DATABASE_URL=process.env.DATABASE_URL;
const CLOUD_NAME=process.env.CLOUD_NAME;
const API_KEY=process.env.API_KEY;
const API_SECRET=process.env.API_SECRET;

const supportedTypes = ["jpg", "jpeg", "png"];
const file_storage_directory="legal_samadhan"


module.exports = { PORT,DATABASE_URL,CLOUD_NAME,API_KEY,API_SECRET,supportedTypes,file_storage_directory };