import axios from "axios";
import { useState } from "react";
import api from "./api";

function Try() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("http://127.0.0.1:8000/accounts/login/", {
            email,
            password,
        });

        console.log("Login success:", response.data);

        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
    }

  };

  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
    </form>
  );
}

export default Try;
