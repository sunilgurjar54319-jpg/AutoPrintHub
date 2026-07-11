const express = require("express");
const router = express.Router();

const {
  createPayment,
  verifyPayment
} = require("../controllers/paymentController");

// Create Razorpay Order
router.post("/create", createPayment);

// Verify Payment
router.post("/verify", verifyPayment);

// Test API
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Payment API Working"
  });
});

module.exports = router;
