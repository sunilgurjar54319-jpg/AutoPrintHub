const express = require("express");
const router = express.Router();

const {
  startPrint,
  getPrintQueue,
  markPrinted
} = require("../controllers/printerController");

router.post("/start/:orderId", startPrint);

router.post("/printed/:orderId", markPrinted);

router.get("/queue/:shopId", getPrintQueue);


module.exports = router;
