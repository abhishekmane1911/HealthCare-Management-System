import React, { useState } from "react";
import { login } from "../api"; // Ensure the correct import path

const Login = ({ toggleAuthMode }: { toggleAuthMode: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(username, password);
      alert("Login Successful!");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Welcome Back!</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="block text-white">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-green-500"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label className="block text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-green-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          Login
        </button>
      </form>

      <p className="text-white mt-4">
        New here?{" "}
        <button onClick={toggleAuthMode} className="text-green-500 hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;