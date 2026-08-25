import { useState } from "react";
import "./styles/Auth.css";

function VerifyOtp({ setPage }) {
  const [otp, setOtp] = useState("");
  const email = sessionStorage.getItem("verificationEmail") || "";

  const verify = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/register/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message);
      alert(data.message);
      setPage("set-password");
    } catch (error) {
      console.error("Verification error:", error);
      alert("Server error");
    }
  };

  return <div className="container"><div className="card">
    <h2>Verify Email</h2>
    <p>Enter the code sent to {email}.</p>
    <input value={otp} onChange={(event) => setOtp(event.target.value)} placeholder="6-digit code" maxLength="6" inputMode="numeric" autoFocus />
    <button onClick={verify}>Verify email</button>
    <p><button className="link-btn" onClick={() => setPage("login")}>Back to login</button></p>
  </div></div>;
}

export default VerifyOtp;