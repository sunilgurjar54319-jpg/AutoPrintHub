const express = require("express");
const router = express.Router();

const {
  getOrders,
  getOrderById
} = require("../controllers/orderController");


// Get All Orders
router.get("/", getOrders);


// Get Single Order
router.get("/:id", getOrderById);


module.exports = router;
