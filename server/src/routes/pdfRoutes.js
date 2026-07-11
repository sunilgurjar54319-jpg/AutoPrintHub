const express = require("express");
const router = express.Router();
const multer = require("multer");

const { getPdfInfo } = require("../controllers/pdfController");

const upload = multer({
  dest: "uploads/"
});

router.post("/info", upload.single("file"), getPdfInfo);

module.exports = router;
