import { useState } from "react";
import "./styles/Auth.css";


function Register({ setPage }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    if (!user.username || !user.email || !user.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Registration Successful");
      setPage("login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Name"
          value={user.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />

        <button onClick={handleRegister}>Register</button>

        <p>
          Already have an account?{" "}
          <button className="link-btn" onClick={() => setPage("login")}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;