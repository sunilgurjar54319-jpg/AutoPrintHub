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

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
