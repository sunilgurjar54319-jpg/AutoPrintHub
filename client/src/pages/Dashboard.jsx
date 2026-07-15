import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { useState, useEffect } from "react";
import api from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

const shop = JSON.parse(
  localStorage.getItem("shop")
);

useEffect(() => {

  if (!shop) {
    navigate("/login");
  }

}, [shop, navigate]);

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
  <div className="dashboard-layout">

  <div className="sidebar">
  <h2>🖨️ AutoPrintHub</h2>

  <hr />

  <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
  <p>📊 Dashboard</p>
</Link>

<Link to="/settings" style={{ color: "white", textDecoration: "none" }}>
  <p>⚙️ Settings</p>
</Link>

<p>📄 Orders (Coming Soon)</p>

<p
  style={{ cursor: "pointer" }}
  onClick={() => {
    localStorage.removeItem("shop");
    navigate("/login");
  }}
>
  🚪 Logout
</p>
</div>

<div className="main">
      <h2>📊 Shop Dashboard</h2>

      <h3>{shop?.shopName}</h3>

<p>🆔 {shop?.shopId}</p>

<p>📱 {shop?.mobile}</p>

{shop?.qrCode && (
  <img
    src={shop.qrCode}
    width="180"
    alt="QR Code"
  />
)}

      <div style={{ marginBottom: "20px" }}>
  <Link to="/settings">
    <button>⚙️ Settings</button>
  </Link>
</div>

      <div className="cards">

  <div
  className="card"
  style={{ background:"#1976d2" }}
>
    <h3>{stats.totalOrders}</h3>
    <p>Total Orders</p>
  </div>

  <div
  className="card"
  style={{ background:"##f57c00" }}
>
    <h3>{stats.pending}</h3>
    <p>Pending</p>
  </div>

  <div
  className="card"
  style={{ background:"#2e7d32" }}
>
    <h3>{stats.paid}</h3>
    <p>Paid</p>
  </div>

  <div
  className="card"
  style={{ background:"#6a1b9a" }}
>
    <h3>{stats.printed}</h3>
    <p>Printed</p>
  </div>

  <div
  className="card"
  style={{ background:"#00897b" }}
>
    <h3>₹{stats.revenue}</h3>
    <p>Revenue</p>
  </div>

</div>


      <div className="table-box">

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
<button
  onClick={async () => {
    try {

      const res = await api.post(
        `/printers/printed/${order.$id}`
      );

      alert(res.data.message);

      window.location.reload();

    } catch (error) {
      alert("Mark Printed failed");
      console.log(error);
    }
  }}
>
  ✅ Mark Printed
</button>

            </td>


          </tr>
        ))}

        </tbody>

      </table>

</div>
      

    </div>

</div>
);
}


export default Dashboard;
