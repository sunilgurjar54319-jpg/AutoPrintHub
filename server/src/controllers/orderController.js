const { databases } = require("../config/appwrite");
const { ID, Query } = require("node-appwrite");


// ================= CREATE ORDER =================

exports.createOrder = async (req, res) => {

  try {

    const {
      shopId,
      fileId,
      fileName,
      printType,
      copies,
      totalPrice
    } = req.body;


    const order = await databases.createDocument(

      process.env.APPWRITE_DATABASE_ID,

      process.env.APPWRITE_ORDER_COLLECTION_ID,

      ID.unique(),

      {
        shopId,
        fileId,
        fileName,
        printType,
        copies,
        totalPrice,
        status: "PENDING",
        printStatus: "WAITING",
        createdAt: new Date().toISOString()
      }

    );


    res.json({

      success: true,

      order

    });


  } catch(error) {

    console.log(error);

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};



// ================= GET ALL ORDERS =================

exports.getOrders = async (req, res) => {
  try {

    const queries = [];

    if (req.query.shopId) {
      queries.push(
        Query.equal("shopId", req.query.shopId)
      );
    }

    const result = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_ORDER_COLLECTION_ID,
      queries
    );

    res.json({
      success: true,
      orders: result.documents
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// ================= GET SINGLE ORDER =================

exports.getOrderById = async(req,res)=>{

  try{

    const order =
    await databases.getDocument(

      process.env.APPWRITE_DATABASE_ID,

      process.env.APPWRITE_ORDER_COLLECTION_ID,

      req.params.id

    );


    res.json({

      success:true,

      order

    });


  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};



// ================= UPDATE ORDER STATUS =================

exports.updateOrderStatus = async(req,res)=>{

  try{

    const updated =
    await databases.updateDocument(

      process.env.APPWRITE_DATABASE_ID,

      process.env.APPWRITE_ORDER_COLLECTION_ID,

      req.params.id,

      {

        status:req.body.status,

        printStatus:req.body.printStatus || "WAITING"

      }

    );


    res.json({

      success:true,

      order:updated

    });


  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};



// ================= PRINT QUEUE =================

exports.getPrintQueue = async(req,res)=>{

  try{

    const { shopId } = req.params;


    const result =
    await databases.listDocuments(

      process.env.APPWRITE_DATABASE_ID,

      process.env.APPWRITE_ORDER_COLLECTION_ID,

      [

        Query.equal("shopId", shopId),

        Query.equal("status","PAID"),

        Query.equal("printStatus","WAITING")

      ]

    );


    res.json({

      success:true,

      orders:result.documents

    });


  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};
