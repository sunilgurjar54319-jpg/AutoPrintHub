const { databases } = require("../config/appwrite");
const { ID } = require("node-appwrite");

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const SHOPS_COLLECTION_ID = process.env.APPWRITE_SHOPS_COLLECTION_ID;

exports.registerShop = async (req, res) => {
  console.log("Register API Called");
  console.log(req.body);

  try {
    const {
      shopName,
      ownerName,
      mobile,
      email,
      address,
      upiId
    } = req.body;

    const result = await databases.createDocument(
      DATABASE_ID,
      SHOPS_COLLECTION_ID,
      ID.unique(),
      {
        shopName,
        ownerName,
        mobile,
        email,
        address,
        upiId,
        status: "active"
      }
    );

    res.json({
      success: true,
      message: "Shop Registered Successfully",
      shop: result
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
