import { useState } from "react";
import "./styles/Auth.css";

function ForgotPassword({ setPage }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [sent, setSent] = useState(false);

  const requestCode = async () => {
    const res = await fetch("http://localhost:5000/api/register/forgot-password", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message);
    setSent(true);
    alert(data.message);
  };

  const reset = async () => {
    const res = await fetch("http://localhost:5000/api/register/reset-password", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, otp, password })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message);
    alert(data.message);
    setPage("login");
  };

  return <div className="container"><div className="card">
    <h2>Reset Password</h2>
    <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
    {sent && <><input placeholder="Reset code" value={otp} onChange={(event) => setOtp(event.target.value)} maxLength="6" /><input type="password" placeholder="New password" value={password} onChange={(event) => setPassword(event.target.value)} /></>}
    <button onClick={sent ? reset : requestCode}>{sent ? "Reset password" : "Send reset code"}</button>
    <p><button className="link-btn" onClick={() => setPage("login")}>Back to login</button></p>
  </div></div>;
}

export default ForgotPassword;