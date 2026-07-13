const express = require("express");
const router = express.Router();

const {
  startPrint,
  getPrintQueue
} = require("../controllers/printerController");

router.post("/start/:orderId", startPrint);

router.get("/queue/:shopId", getPrintQueue);


module.exports = router;
