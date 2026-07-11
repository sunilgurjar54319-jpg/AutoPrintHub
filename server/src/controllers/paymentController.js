const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const Order = require("../models/orderModel");

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "autoprint_order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.verifyPayment = async (req, res) => {
  try {

    const {
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


    if (expectedSignature === razorpay_signature) {

  const {
    pages,
    copies,
    color,
    amount
  } = req.body;


  const newOrder = await Order.create({

    pages: pages,
    copies: copies,
    printType: color,
    amount: amount,

    paymentId: razorpay_payment_id,

    orderStatus: "Paid"

  });


  return res.json({
    success: true,
    message: "Payment Verified",
    order: newOrder
  });

}


    res.status(400).json({
      success: false,
      message: "Invalid Signature"
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
