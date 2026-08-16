  import { useEffect, useState } from "react";


  function Income(){
    const [income,setIncome]=useState([]);
    useEffect(()=>{
      fetch("http://localhost:5000/api/income",)
      .then((res)=>res.json())
      .then((data)=>{
        setIncome(data)
      })
      .catch((error)=>{
        console.error("Error fetching income:",error);
      })  
    }, [])
      return(<>
          <div className="income-container">
        <h2>Income</h2>

        <div className="income-card">
          <h3>Total Income</h3>
          <h1>₹1,25,000</h1>
        </div>

        <button>Add Income</button>
        {income.map((income) => (
          <div key={income._id} className="income-item">
            <h4>{income.title}</h4>
            <p>₹{income.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>  
      </>)    

      }
  export default Income;