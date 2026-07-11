const { databases } = require("../config/appwrite");
const { ID } = require("node-appwrite");

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const ORDER_COLLECTION_ID = "orders";

exports.createUploadOrder = async (req, res) => {
  try {
    const {
      shopId,
      fileId,
      fileName,
      copies,
      colorMode,
      pageSize
    } = req.body;

    const result = await databases.createDocument(
      DATABASE_ID,
      ORDER_COLLECTION_ID,
      ID.unique(),
      {
        shopId,
        fileId,
        fileName,
        copies,
        colorMode,
        pageSize,
        paymentStatus: "pending",
        printStatus: "pending",
        totalAmount: 0
      }
    );

    res.json({
      success: true,
      order: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
