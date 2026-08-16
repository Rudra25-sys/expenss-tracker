import { useState } from "react";

function Register({ setPage }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Registration Successful");
        setPage("login");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
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
        <button onClick={() => setPage("login")}>Login</button>
      </p>
    </div>
  );
}

export default Register;