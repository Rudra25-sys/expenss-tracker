import { useState } from "react";
import "./styles/Auth.css";

function SetPassword({ setPage }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = sessionStorage.getItem("verificationEmail") || "";

  const setAccountPassword = async () => {
    if (!email) {
      alert("Registration session expired");
      setPage("register");
      return;
    }
    if (!password || !confirmPassword) {
      alert("Both password fields are required");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/register/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message);

      sessionStorage.removeItem("verificationEmail");
      alert(data.message);
      setPage("login");
    } catch (error) {
      console.error("Password setup error:", error);
      alert("Server error");
    }
  };

  return <div className="container"><div className="card">
    <h2>Set Password</h2>
    <p>Create a password for {email}.</p>
    <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
    <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
    <button onClick={setAccountPassword}>Create account</button>
  </div></div>;
}

export default SetPassword;