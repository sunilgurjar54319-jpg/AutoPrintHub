const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById
} = require("../controllers/orderController");


// Create Order
router.post("/", createOrder);


// Get All Orders
router.get("/", getOrders);


// Get Single Order
router.get("/:id", getOrderById);


module.exports = router;
