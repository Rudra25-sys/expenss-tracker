import { useState } from "react";

function Register({ setPage }) {
  const [user, setUser] = useState({
    name: "",
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
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const exists = users.find((u) => u.email === user.email);

    if (exists) {
      alert("User already exists");
      return;
    }

    // Add new user
    users.push(user);

    // Store updated users in localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful");
    setPage("login");
  };

  return (
    <div className="card">
      <h2>Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={user.name}
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