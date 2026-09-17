
import { useState } from "react"
const API="http://localhost:5000/api/debt"
function AddDept(){
        const [totalDebt,setDebt]=useState("")
        const [Name,setName]=useState("")
        const [Title,setTitle]=useState("")
        const [Amount,setAmount]=useState("")
        const [Date,setDate]=useState("")
      async function handleSubmit(){
           const res=await fetch(API,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                Name,
                Title,
                Amount,
                Date
            })
           }) 
           const data =await res.json()
           console.log(data)
        }
    return(
        <>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Name
            <input type="text" value={Name} onChange={(e)=>{setName(e.target.value)}} /></label>
           <label> Title<input type="text" value={Title} onChange={(e)=>{setTitle(e.target.value)}}/></label>
           <label>Amount<input type="text"  value={Amount} onChange={(e)=>{setAmount(e.target.value)}}/></label>
            <label>Date<input type="date" name="" id="" value={Date} onChange={(e)=>{setDate(e.target.value)}} /></label>
            <button type="submit">Add</button>
        </div>
        </form>
        </>
    )
}
export default AddDept