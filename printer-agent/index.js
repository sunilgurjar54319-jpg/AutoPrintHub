require("dotenv").config();
const axios = require("axios");

console.log("==================================");
console.log(" AutoPrintHub Printer Agent");
console.log(" Shop :", process.env.SHOP_ID);
console.log(" Server :", process.env.SERVER_URL);
console.log("==================================");

async function checkOrders() {
  try {
    const res = await axios.get(
      `${process.env.SERVER_URL}/api/orders`
    );

    console.log(
      "Orders Found:",
      res.data.orders.length
    );

  } catch (err) {
    console.log("Server Error:", err.message);
  }
}

setInterval(checkOrders, 3000);

checkOrders();
