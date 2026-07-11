const express = require("express");
const router = express.Router();

const {
  createOrder
} = require("../controllers/paymentController");

router.post("/create", createOrder);

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Payment API Working"
  });
});

module.exports = router;
