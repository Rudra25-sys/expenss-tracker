import { useState } from "react";


function Login({ setPage, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/register/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Login Successful");

      localStorage.setItem("currentUser", JSON.stringify(data.user));
      setUser(data.user);
      setPage("dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <button className="link-btn" onClick={() => setPage("forgot-password")}>
          Forgot password?
        </button>

        <p>
          Don't have an account?{" "}
          <button className="link-btn" onClick={() => setPage("register")}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;