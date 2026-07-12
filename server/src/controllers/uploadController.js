const { storage } = require("../config/appwrite");
const { ID } = require("node-appwrite");
const { InputFile } = require("node-appwrite/file");

const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;

exports.uploadFile = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const {
      shopId
    } = req.body;


    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "Shop ID required"
      });
    }


    const result = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      InputFile.fromPath(
        req.file.path,
        req.file.originalname
      )
    );


    res.json({
      success: true,
      message: "Upload successful",
      shopId,
      fileId: result.$id
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
