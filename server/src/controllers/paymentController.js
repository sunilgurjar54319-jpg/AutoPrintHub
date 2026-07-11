const crypto = require("crypto");
const razorpay = require("../config/razorpay");

const { databases } = require("../config/appwrite");
const { ID } = require("node-appwrite");


// Create Razorpay Order
exports.createOrder = async (req, res) => {
  try {

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "autoprint_order_" + Date.now()
    };


    const order = await razorpay.orders.create(options);


    res.json({
      success: true,
      order
    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};




// Verify Payment
exports.verifyPayment = async (req, res) => {

  try {


    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      pages,
      copies,
      color,
      amount

    } = req.body;



    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;



    const expectedSignature =
      crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest("hex");



    if(expectedSignature === razorpay_signature){



      const order =
      await databases.createDocument(

        process.env.APPWRITE_DATABASE_ID,

        process.env.APPWRITE_ORDER_COLLECTION_ID,

        ID.unique(),

        {

          paymentId: razorpay_payment_id,

          pages: Number(pages),

          copies: Number(copies),

          printType: color,

          amount: Number(amount),

          status: "Paid",

          createdAt:
          new Date().toISOString()

        }

      );



      return res.json({

        success:true,

        message:"Payment Verified",

        order

      });


    }



    res.status(400).json({

      success:false,

      message:"Invalid Signature"

    });



  } catch(error){


    console.log(error);


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};
