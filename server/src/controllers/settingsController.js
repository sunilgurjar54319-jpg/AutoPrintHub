const { databases } = require("../config/appwrite");

exports.saveSettings = async (req, res) => {
  try {

    const {
      shopId,
      bwSingle,
      bwDouble,
      colorSingle,
      colorDouble,
      upiId
    } = req.body;

    res.json({
      success: true,
      message: "Settings received",
      data: {
        shopId,
        bwSingle,
        bwDouble,
        colorSingle,
        colorDouble,
        upiId
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
