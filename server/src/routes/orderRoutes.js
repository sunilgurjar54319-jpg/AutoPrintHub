const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getPrintQueue
} = require("../controllers/orderController");


// Create Order
router.post("/", createOrder);


// Get All Orders
router.get("/", getOrders);


// Get Single Order
router.get("/:id", getOrderById);

router.get("/queue/:shopId", getPrintQueue);

router.put("/:id/status", updateOrderStatus);

module.exports = router;
