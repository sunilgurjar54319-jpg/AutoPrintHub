require("dotenv").config();

const { databases } = require("./config/appwrite");

async function testConnection() {
  try {
    const result = await databases.list();
    console.log("Appwrite Connected Successfully ✅");
    console.log(result);
  } catch (error) {
    console.log("Connection Error ❌");
    console.log(error.message);
  }
}

testConnection();
