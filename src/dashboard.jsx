import { useState } from "react";
function Dashboard() {
const [page,setPage]=useState(null)
  return (
  
       <main className="main">

        <header>
          <h1>Dashboard</h1>

          <div className="admin">
            👤 Admin
          </div>
        </header>


        {/* Cards */}
        <section className="cards">

          <div className="card green">
            <h3>Total Income</h3>
            <h1>₹1,25,000</h1>
          </div>

          <div className="card red">
            <h3>Total Expense</h3>
            <h1>₹72,000</h1>
          </div>

          <div className="card blue">
            <h3>Net Profit</h3>
            <h1>₹53,000</h1>
          </div>

        </section>


        {/* Chart */}
        <section className="chart">

          <h2>Expense Chart</h2>

          <div className="chart-box">
            Chart Area
          </div>

        </section>


      </main>

    
  );
}
export default Dashboard;