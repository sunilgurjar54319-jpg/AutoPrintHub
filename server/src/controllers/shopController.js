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

    const shopId = "SHOP" + Date.now();

const shopUrl =
`${process.env.PUBLIC_APP_URL}/#/shop/${shopId}`;

const qrCode = await QRCode.toDataURL(shopUrl);

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
        qrCode,
        status: "ACTIVE",
        agentToken: ID.unique()
      }
    );

    res.json({
      success: true,
      shop
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
      shop: result.documents[0]
    });

  } catch (error) {

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
      colorDouble
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
        bwSingle: Number(bwSingle),
        bwDouble: Number(bwDouble),
        colorSingle: Number(colorSingle),
        colorDouble: Number(colorDouble)
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
