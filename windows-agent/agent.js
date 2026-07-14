require("dotenv").config();
const axios = require("axios");
const downloadFile = require("./downloader");

const SERVER = "https://autoprint-hub-server.onrender.com/api";
const SHOP_ID = "SHOP1783907097192"; // अभी आपकी Shop ID
let processing = false;

async function checkQueue() {

  if (processing) return;
  processing = true;

  try {

    const res = await axios.get(
      `${SERVER}/printers/queue/${SHOP_ID}`
    );

    const orders = res.data.orders || [];

    console.log(
      `Jobs Found: ${orders.length}`
    );

    orders.forEach((order) => {
      console.log(
        `🖨️ ${order.fileName} (${order.status})`
      );
    });
for (const order of orders) {

await axios.post(
  `${SERVER}/printers/start/${order.$id}`
);

console.log("Status → PRINTING");

  const res = await axios.get(
    `${SERVER}/upload/${order.fileId}`
  );

  const filePath = await downloadFile(
    res.data.url,
    order.fileName
  );

  console.log("Downloaded:", filePath);

  await axios.post(
  `${SERVER}/printers/printed/${order.$id}`
);

console.log("Status → PRINTED");

}

  } catch (err) {
  console.log("Server Error:", err.message);
} finally {
  processing = false;
}
}

setInterval(checkQueue, 3000);

console.log("AutoPrintHub Agent Started...");
