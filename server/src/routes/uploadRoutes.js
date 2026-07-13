const express = require("express");
const router = express.Router();
const multer = require("multer");

const { uploadFile, getFileUrl } = require("../controllers/uploadController");

const upload = multer({
  dest: "uploads/"
});

router.post("/", upload.single("file"), uploadFile);

router.get("/:fileId", getFileUrl);

module.exports = router;
