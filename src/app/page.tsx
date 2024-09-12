"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/protected");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred while logging in");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <p className="h1">WELCOME</p>
        <div className="col-auto">
          <form onSubmit={submitLogin}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              aria-label="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              aria-label="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Log In</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
