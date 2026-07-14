const express = require("express");
const router = express.Router();

const {
  registerShop,
  loginShop,
  getShopById,
  getShopSettings,
  updateShopSettings
} = require("../controllers/shopController");

// Register Shop
router.post("/register", registerShop);

// Login Shop
router.post("/login", loginShop);

// Get Shop by Shop ID
router.get("/:shopId", getShopById);

router.get("/settings/:shopId", getShopSettings);

router.put("/settings", updateShopSettings);

module.exports = router;
