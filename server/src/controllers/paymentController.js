const crypto = require("crypto");
const razorpay = require("../config/razorpay");

const { databases } = require("../config/appwrite");
const { Query } = require("node-appwrite");


// Create Razorpay Order
exports.createOrder = async (req, res) => {

  try {

    const {
      orderId,
      amount
    } = req.body;

    const razorpayOrder =
      await razorpay.orders.create({

        amount: Number(amount) * 100,

        currency: "INR",

        receipt: orderId

      });

    res.json({

      success: true,

      razorpayOrder

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
// Verify Razorpay Payment
exports.verifyPayment = async (req, res) => {

  try {

    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
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


    if (expectedSignature !== razorpay_signature) {

      return res.status(400).json({

        success: false,

        message: "Invalid Signature"

      });

    }


    const result =
      await databases.listDocuments(

        process.env.APPWRITE_DATABASE_ID,

        process.env.APPWRITE_ORDER_COLLECTION_ID,

        [
          Query.equal("$id", orderId)
        ]

      );


    if (result.total === 0) {

      return res.status(404).json({

        success: false,

        message: "Order Not Found"

      });

    }


    const order = result.documents[0];
    const updatedOrder =
      await databases.updateDocument(

        process.env.APPWRITE_DATABASE_ID,

        process.env.APPWRITE_ORDER_COLLECTION_ID,

        order.$id,

        {

          status: "PAID",

          paymentId: razorpay_payment_id,

          razorpayOrderId: razorpay_order_id,

          paidAt: new Date().toISOString()

        }

      );


    return res.json({

      success: true,

      message: "Payment Verified Successfully",

      order: updatedOrder

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
