const express = require("express");
const router = express.Router();

const {
  saveRates,
  getRates
} = require("../controllers/rateController");


// Save Shop Rates
router.post("/save", saveRates);


// Get Shop Rates
router.get("/:shopId", getRates);


module.exports = router;
