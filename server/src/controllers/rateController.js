const { databases } = require("../config/appwrite");
const { ID, Query } = require("node-appwrite");

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const RATE_COLLECTION_ID = "rates";

exports.saveRates = async (req, res) => {
  try {
    const {
      shopId,
      bwSingle,
      bwMultiple,
      colorSingle,
      colorMultiple,
      photo4x6,
      a4Color
    } = req.body;

    const result = await databases.createDocument(
      DATABASE_ID,
      RATE_COLLECTION_ID,
      ID.unique(),
      {
        shopId,
        bwSingle,
        bwMultiple,
        colorSingle,
        colorMultiple,
        photo4x6,
        a4Color
      }
    );

    res.json({
      success: true,
      message: "Rates Saved Successfully",
      data: result
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
exports.getRates = async (req, res) => {
  try {

    const { shopId } = req.params;

    const result = await databases.listDocuments(
      DATABASE_ID,
      RATE_COLLECTION_ID,
      [
        Query.equal("shopId", shopId)
      ]
    );


    if (result.total === 0) {

      return res.status(404).json({
        success:false,
        message:"Rates not found"
      });

    }


    res.json({
      success:true,
      rates: result.documents[0]
    });


  } catch(err){

    res.status(500).json({
      success:false,
      message:err.message
    });

  }
};
