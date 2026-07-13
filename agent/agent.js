const axios = require("axios");

const SHOP_ID = "SHOP1783821759518";

const SERVER =
  "http://localhost:5000";


async function checkQueue(){

  try{

    const res = await axios.get(
      `${SERVER}/api/printers/queue/${SHOP_ID}`
    );


    const orders = res.data.orders;


    if(orders.length > 0){

      console.log("New Print Job Found:");

      orders.forEach(order=>{

        console.log(
          order.fileName,
          order.status
        );

      });

    }
    else{

      console.log("No Print Job");

    }


  }
  catch(error){

    console.log(
      "Agent Error:",
      error.message
    );

  }

}


setInterval(
  checkQueue,
  5000
);


checkQueue();
