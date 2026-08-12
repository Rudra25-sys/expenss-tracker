
import { useState } from "react";

const users = [
  {
    email: "test@gmail.com",
    password: "1234"
  }
];

function Login({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      alert("Login Successful");

      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      setPage("dashboard");

    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div>

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>
        Don't have an account?
        <button onClick={() => setPage("register")}>
          Register
        </button>
      </p>

    </div>
  );
}

export default Login;

