const cloudinary=require('cloudinary').v2;
const {CLOUD_NAME,API_KEY,API_SECRET}=require('../config')


exports.cloudinaryConnect = () => {
    try{
            cloudinary.config({
                cloud_name:CLOUD_NAME,
                api_key: API_KEY,
                api_secret:API_SECRET,
            })
            console.log("cloudinary connected");
    }
    catch(error) {
        console.log("This is the error got , while connecting to cloudinary server",error);
    }
}

