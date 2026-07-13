const { databases } = require("../config/appwrite");
const { Query } = require("node-appwrite");


exports.getPrintQueue = async (req, res) => {

  try {

    const { shopId } = req.params;


    const orders = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_ORDER_COLLECTION_ID,
      [
        Query.equal("shopId", shopId),
        Query.equal("status", "PAID")
      ]
    );


    res.json({
      success: true,
      orders: orders.documents
    });


  } catch(error) {

    console.log(error);

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};
exports.startPrint = async (req, res) => {
  try {
    const { orderId } = req.params;

    res.json({
      success: true,
      message: "Print started",
      orderId
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
