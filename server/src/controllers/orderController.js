const { databases } = require("../config/appwrite");
const { ID } = require("node-appwrite");


// Create Order
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
        createdAt: new Date().toISOString()
      }

    );


    res.json({

      success:true,

      message:"Order Created Successfully",

      order

    });


  } catch(error) {


    console.log(error);
console.log(error.response);
console.log(error.stack);


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};




// Get All Orders
exports.getOrders = async (req, res) => {

  try {

    const orders = await databases.listDocuments(

      process.env.APPWRITE_DATABASE_ID,

      process.env.APPWRITE_ORDER_COLLECTION_ID

    );


    res.json({

      success:true,

      orders:orders.documents

    });


  } catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};




// Get Single Order
exports.getOrderById = async (req,res)=>{

  try {

    const order = await databases.getDocument(

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
