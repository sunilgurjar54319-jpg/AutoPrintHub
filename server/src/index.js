const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();


// Routes
const shopRoutes = require("./routes/shopRoutes");
const rateRoutes = require("./routes/rateRoutes");
const printerRoutes = require("./routes/printerRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const orderRoutes = require("./routes/orderRoutes");
const calculateRoutes = require("./routes/calculateRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const uploadOrderRoutes = require("./routes/uploadOrderRoutes");
const pdfRoutes = require("./routes/pdfRoutes");



// Middleware
app.use(cors());

app.use(express.json());



// Home Route
app.get("/", (req,res)=>{

  res.json({

    app:"AutoPrint Hub",

    status:"Running",

    version:"1.0.0"

  });

});



// Test Route
app.get("/test",(req,res)=>{

  res.json({

    success:true,

    message:"AutoPrint Hub API Working"

  });

});



// Debug Register Shop
app.get("/debug-register", async(req,res)=>{

 const { registerShop } = require("./controllers/shopController");


 req.body = {

  shopName:"Shri Dev Printing",

  ownerName:"Sunil",

  mobile:"9876543210",

  address:"Rajasthan",

  printerName:"HP Smart Tank 529",

  printerType:"HP"

 };


 return registerShop(req,res);

});




// Debug Rate Save
app.get("/debug-rate", async(req,res)=>{


 const { saveRates } = require("./controllers/rateController");


 req.body = {

  shopId:"SHOP1783821759518",

  bwSingle:1,

  bwMultiple:2,

  colorSingle:5,

  colorMultiple:8,

  photo4x6:10,

  a4Color:20

 };


 return saveRates(req,res);


});




// Debug Order Create
app.get("/debug-order", async(req,res)=>{


 const { createOrder } = require("./controllers/orderController");


 req.body = {

  shopId:"SHOP1783821759518",

  fileId:"6a531ba1003a93201306",

  fileName:"test.pdf",

  printType:"colorSingle",

  copies:5,

  totalPrice:25

 };


 return createOrder(req,res);


});




// API Routes

app.use("/api/shops", shopRoutes);

app.use("/api/rates", rateRoutes);

app.use("/api/printers", printerRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/calculate", calculateRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/upload-order", uploadOrderRoutes);

app.use("/api/pdf", pdfRoutes);




// Server Start

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

 console.log(`Server running on port ${PORT}`);

});
