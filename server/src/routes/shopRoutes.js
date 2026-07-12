const express = require("express");
const router = express.Router();

const {
  registerShop,
  loginShop,
  getShopById
} = require("../controllers/shopController");

// Register Shop
router.post("/register", registerShop);

// Login Shop
router.post("/login", loginShop);

// Get Shop by Shop ID
router.get("/:shopId", getShopById);

module.exports = router;
