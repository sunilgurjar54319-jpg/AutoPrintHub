const express = require("express");
const cors = require("cors");
require("dotenv").config();

const shopRoutes = require("./routes/shopRoutes");
const rateRoutes = require("./routes/rateRoutes");
const printerRoutes = require("./routes/printerRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const orderRoutes = require("./routes/orderRoutes");
const calculateRoutes = require("./routes/calculateRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const uploadOrderRoutes = require("./routes/uploadOrderRoutes");
const pdfRoutes = require("./routes/pdfRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.json({
    app: "AutoPrint Hub",
    status: "Running",
    version: "1.0.0"
  });
});

// Test Route
app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "AutoPrint Hub API Working"
  });
});

// Debug Register
app.get("/debug-register", async (req, res) => {
  const { registerShop } = require("./controllers/shopController");

  req.body = {
    shopName: "Shri Dev Printing",
    ownerName: "Sunil",
    mobile: "9876543210",
    address: "Rajasthan",
    printerName: "HP Smart Tank 529",
    printerType: "HP"
  };

  return registerShop(req, res);
});

// Debug Login
app.get("/debug-login", async (req, res) => {
  const { loginShop } = require("./controllers/shopController");

  req.body = {
    mobile: "9876543210"
  };

  return loginShop(req, res);
});

// API Routes
app.use("/api/shop", shopRoutes);
app.use("/api/rates", rateRoutes);
app.get("/debug-rate", async (req, res) => {

  const { saveRates } = require("./controllers/rateController");

  req.body = {
    shopId: "SHOP1783821759518",
    bwSingle: 1,
    bwMultiple: 2,
    colorSingle: 5,
    colorMultiple: 8,
    photo4x6: 10,
    a4Color: 20
  };

  return saveRates(req, res);

});
app.use("/api/printers", printerRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/calculate", calculateRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/upload-order", uploadOrderRoutes);
app.use("/api/pdf", pdfRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
