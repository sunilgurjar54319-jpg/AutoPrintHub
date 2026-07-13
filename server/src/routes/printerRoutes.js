const express = require("express");
const router = express.Router();

const {
  getPrintQueue
} = require("../controllers/printerController");


router.get("/queue/:shopId", getPrintQueue);


module.exports = router;
