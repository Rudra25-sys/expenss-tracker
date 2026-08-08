import { useState } from "react";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      alert("Login Successful");
      localStorage.setItem("currentUser", JSON.stringify(user));
      setPage("dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        Don't have an account?{" "}
        <button onClick={() => setPage("register")}>Register</button>
      </p>
    </div>
  );
}

export default Login;