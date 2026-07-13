import { useState, useEffect } from "react";
import api from "../services/api";

function Dashboard() {

  const [stats, setStats] = useState({
    totalOrders: 0,
    pending: 0,
    paid: 0,
    printed: 0,
    revenue: 0
  });

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");

      const orderList = res.data.orders || [];

      setOrders(orderList);

      setStats({
        totalOrders: orderList.length,
        pending: orderList.filter(
          o => o.status === "PENDING"
        ).length,

        paid: orderList.filter(
          o => o.status === "PAID"
        ).length,

        printed: orderList.filter(
          o => o.status === "PRINTED"
        ).length,

        revenue: orderList.reduce(
          (sum, o) => sum + o.totalPrice,
          0
        )
      });

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);


  const startPrinting = async (orderId) => {
    try {

      await api.post(
        `/printers/start/${orderId}`
      );


      await api.put(
        `/orders/${orderId}/status`,
        {
          status: "PRINTING"
        }
      );


      await fetchOrders();

      alert("Print started");

    } catch (error) {

      console.log(error);
      alert("Print start failed");

    }
  };


  return (
    <div>

      <h2>📊 Shop Dashboard</h2>

      <div>Total Orders : {stats.totalOrders}</div>
      <div>Pending : {stats.pending}</div>
      <div>Paid : {stats.paid}</div>
      <div>Printed : {stats.printed}</div>
      <div>Revenue : ₹{stats.revenue}</div>


      <h3>📋 Recent Orders</h3>

      <table border="1" width="100%">

        <thead>
          <tr>
            <th>File</th>
            <th>Status</th>
            <th>Copies</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>


        <tbody>

        {orders.map((order)=>(
          <tr key={order.$id}>

            <td>
              {order.fileName}
            </td>

            <td>
              {order.status}
            </td>

            <td>
              {order.copies}
            </td>

            <td>
              ₹{order.totalPrice}
            </td>


            <td>

              <button
              onClick={async()=>{

                const res = await api.get(
                  `/upload/${order.fileId}`
                );

                window.open(
                  res.data.url,
                  "_blank"
                );

              }}
              >
                View File
              </button>


              <button
              onClick={()=>
                startPrinting(order.$id)
              }
              >
                🖨️ Print
              </button>


            </td>


          </tr>
        ))}

        </tbody>

      </table>


    </div>
  );
}


export default Dashboard;
