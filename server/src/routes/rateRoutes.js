const express = require("express");
const router = express.Router();

const { saveRates } = require("../controllers/rateController");

router.post("/save", saveRates);

module.exports = router;
