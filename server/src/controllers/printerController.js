const { databases } = require("../config/appwrite");
const { ID } = require("node-appwrite");

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const PRINTER_COLLECTION_ID = "printers";

exports.registerPrinter = async (req, res) => {
  try {
    const {
      shopId,
      printerName,
      printerType,
      printerModel
    } = req.body;

    const result = await databases.createDocument(
      DATABASE_ID,
      PRINTER_COLLECTION_ID,
      ID.unique(),
      {
        shopId,
        printerName,
        printerType,
        printerModel,
        status: "online"
      }
    );

    res.json({
      success: true,
      message: "Printer Registered Successfully",
      data: result
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
