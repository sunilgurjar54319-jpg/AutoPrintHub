const express = require("express");
const router = express.Router();

const { registerPrinter } = require("../controllers/printerController");

router.post("/register", registerPrinter);

module.exports = router;
