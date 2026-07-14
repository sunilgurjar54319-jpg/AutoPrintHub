const { databases } = require("../config/appwrite");
const { ID, Query } = require("node-appwrite");
const QRCode = require("qrcode");

exports.registerShop = async (req, res) => {
  try {
    const {
      shopName,
      ownerName,
      mobile,
      address,
      printerName,
      printerType
    } = req.body;

    // Check if mobile already exists
    const existing = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_SHOPS_COLLECTION_ID,
      [Query.equal("mobile", mobile)]
    );

    if (existing.total > 0) {
      return res.status(400).json({
        success: false,
        message: "Mobile number already registered"
      });
    }

    const shopId = "SHOP" + Date.now();
    const agentToken = ID.unique();
const shopUrl =
  `${process.env.PUBLIC_APP_URL}/shop/${shopId}`;

const qrCode =
  await QRCode.toDataURL(shopUrl);
console.log(qrCode.substring(0, 50));

    const shop = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_SHOPS_COLLECTION_ID,
      ID.unique(),
      {
        shopId,
        shopName,
        ownerName,
        mobile,
        address,
        printerName,
        printerType,
        agentToken,
        status: "ACTIVE",
        qrCode
      }
    );

    res.json({
      success: true,
      message: "Shop Registered Successfully",
      shop
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.getShopById = async (req, res) => {
  try {
    const { shopId } = req.params;

    const result = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_SHOPS_COLLECTION_ID,
      [Query.equal("shopId", shopId)]
    );

    if (result.total === 0) {
      return res.status(404).json({
        success: false,
        message: "Shop not found"
      });
    }

    res.json({
      success: true,
      shop: result.documents[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.loginShop = async (req, res) => {
  try {

    const { mobile } = req.body;

    const result = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_SHOPS_COLLECTION_ID,
      [Query.equal("mobile", mobile)]
    );

    if (result.total === 0) {
      return res.status(404).json({
        success: false,
        message: "Shop not found"
      });
    }

    res.json({
      success: true,
      message: "Login Successful",
      shop: result.documents[0]
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.getShopSettings = async (req, res) => {
  try {
    const { shopId } = req.params;

    const result = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_SHOPS_COLLECTION_ID,
      [Query.equal("shopId", shopId)]
    );

    if (result.total === 0) {
      return res.status(404).json({
        success: false,
        message: "Shop not found"
      });
    }

    res.json({
      success: true,
      settings: result.documents[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateShopSettings = async (req, res) => {
  try {

    const {
      shopId,
      bwSingle,
      bwDouble,
      colorSingle,
      colorDouble,
      upiId
    } = req.body;

    const result = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_SHOPS_COLLECTION_ID,
      [Query.equal("shopId", shopId)]
    );

    if (result.total === 0) {
      return res.status(404).json({
        success: false,
        message: "Shop not found"
      });
    }

    const shop = result.documents[0];

    await databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_SHOPS_COLLECTION_ID,
      shop.$id,
      {
        bwSingle,
        bwDouble,
        colorSingle,
        colorDouble,
        upiId
      }
    );

    res.json({
      success: true,
      message: "Settings Updated Successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
