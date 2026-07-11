const { databases } = require("../config/appwrite");
const { ID } = require("node-appwrite");

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const ORDER_COLLECTION_ID = "orders";

exports.createOrder = async (req, res) => {
  try {
    const {
      shopId,
      fileId,
      copies,
      colorMode,
      pageSize,
      totalAmount
    } = req.body;

    const result = await databases.createDocument(
      DATABASE_ID,
      ORDER_COLLECTION_ID,
      ID.unique(),
      {
        shopId,
        fileId,
        copies,
        colorMode,
        pageSize,
        totalAmount,
        paymentStatus: "pending",
        printStatus: "pending"
      }
    );

    res.json({
      success: true,
      order: result
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
