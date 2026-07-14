const express = require("express");
const router = express.Router();

const {
  saveSettings
} = require("../controllers/settingsController");

router.post("/", saveSettings);

module.exports = router;
