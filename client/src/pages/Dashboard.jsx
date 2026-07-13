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


useEffect(() => {

  api.get("/orders")
  .then((res)=>{

    setOrders(res.data.orders || []);

    const orders = res.data.orders || [];

    setStats({

      totalOrders: orders.length,

      pending:
      orders.filter(o=>o.status==="PENDING").length,

      paid:
      orders.filter(o=>o.status==="PAID").length,

      printed:
      orders.filter(o=>o.status==="PRINTED").length,

      revenue:
      orders.reduce(
        (sum,o)=>sum + Number(o.totalPrice || 0),
        0
      )

    });

  })
  .catch(err=>{
    console.log(err);
  });

},[]);

  return (
    <div style={{ padding: 20 }}>

      <h2>📊 Shop Dashboard</h2>

      <div>Total Orders : {stats.totalOrders}</div>
      <br />

      <div>Pending : {stats.pending}</div>
      <br />

      <div>Paid : {stats.paid}</div>
      <br />

      <div>Printed : {stats.printed}</div>
      <br />

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
        <td>{order.fileName}</td>
        <td>{order.status}</td>
        <td>{order.copies}</td>
        <td>₹{order.totalPrice}</td>
        
        <td>
  <button
  onClick={async () => {
    try {

      const res = await api.get(
        `/upload/${order.fileId}`
      );

      window.open(res.data.url, "_blank");

    } catch (error) {
      alert("File open failed");
      console.log(error);
    }
  }}
>
  View File
</button>
<button
  onClick={async () => {
  try {

    const res = await api.post(
      `/printers/start/${order.$id}`
    );

    await api.put(
  `/orders/${order.$id}/status`,
  {
    status: "PRINTING"
  }
);

window.location.reload();

alert("Print started");

  } catch (error) {
    alert("Print start failed");
    console.log(error);
  }
}}
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
