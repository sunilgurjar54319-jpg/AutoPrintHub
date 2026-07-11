const express = require("express");
const router = express.Router();

const {
  createOrder,
  verifyPayment
} = require("../controllers/paymentController");


router.post("/create", createOrder);

router.post("/verify", verifyPayment);


router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Payment API Working"
  });
});


module.exports = router;
