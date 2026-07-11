const express = require("express");
const router = express.Router();

const {
  createUploadOrder
} = require("../controllers/uploadOrderController");

router.post("/create", createUploadOrder);

module.exports = router;
