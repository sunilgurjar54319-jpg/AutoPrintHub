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
