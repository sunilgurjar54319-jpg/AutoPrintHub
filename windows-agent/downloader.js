const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function downloadFile(url, fileName) {

  if (!fs.existsSync("downloads")) {
    fs.mkdirSync("downloads");
  }

  const filePath = path.join("downloads", fileName);

  const writer = fs.createWriteStream(filePath);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream"
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", () => resolve(filePath));
    writer.on("error", reject);
  });

}

module.exports = downloadFile;
