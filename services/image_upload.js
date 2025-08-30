// const cloudinary = require("cloudinary").v2;
// const {supportedTypes,file_storage_directory} =require('../config')

// function isFileTypeSupported(type, supportedTypes) {
//     return supportedTypes.includes(type);
//  }
 
//  async function uploadFileToCloudinary(file, folder, quality) {
//     const options = {folder};
//     console.log("temp file path", file.tempFilePath);
 
//     if(quality) {
//         options.quality = quality;
//     }
 
//     options.resource_type = "auto";
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
//  }
 
//  exports.imageUpload=async (req,res)=>{
  
//     try{
//     console.log("this is upload");
//     const file = req.files.imageFile;
//      console.log("this is file",file);
    
//      const fileType = file.name.split('.')[1].toLowerCase();
//      console.log("File Type:", fileType);
 
//      if(!isFileTypeSupported(fileType, supportedTypes)) {
//        return res.status(400).json({
//            success:false,
//            message:'File format not supported',
//        })
//    }
 
//          console.log(" Uploading ");
//          const response = await uploadFileToCloudinary(file,file_storage_directory);
//          console.log("This is the response from uploading ",response);
 
    
 
 
//          return res.json({
//           success:true,
//           imageUrl:response.secure_url,
//           message:'Image Successfully Uploaded',
          
//       });
//     }
//     catch(error){
//        console.error(error);
//        res.status(400).json({
//            success:false,
//            message:'Something went wrong while uploading the file',
//        });
//     }
//  }
 

// utils/cloudinary.js
const cloudinary = require("cloudinary").v2;
const { supportedTypes, file_storage_directory } = require("../config");

function isFileTypeSupported(type) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder, resource_type: "auto" };
  if (quality) options.quality = quality;
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

async function uploadImageFile(file) {
  const fileType = file.name.split(".").pop().toLowerCase();
  if (!isFileTypeSupported(fileType)) {
    throw new Error("File format not supported");
  }
  const response = await uploadFileToCloudinary(file, file_storage_directory);
  return response.secure_url;
}

module.exports = { uploadImageFile };
