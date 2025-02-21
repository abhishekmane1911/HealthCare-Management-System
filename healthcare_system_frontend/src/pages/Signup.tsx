import React, { useState } from "react";
import { register } from "../api"; // Ensure the correct import path

const Signup = ({ toggleAuthMode }: { toggleAuthMode: () => void }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPatient, setIsPatient] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isPatient && !isDoctor) {
      setError("You must select either Patient or Doctor.");
      return;
    }

    if (isPatient && isDoctor) {
      setError("You cannot select both Patient and Doctor.");
      return;
    }

    try {
      await register(username, email, password, isDoctor, isPatient);
      alert("Registration Successful!");
      toggleAuthMode(); // Switch to login after successful signup
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Create an Account</h2>
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
          <label className="block text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-green-500"
            placeholder="Enter your email"
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

        {/* Role Selection */}
        <div>
          <label className="block text-white">Select Role</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isPatient}
                onChange={() => {
                  setIsPatient(!isPatient);
                  setIsDoctor(false);
                }}
                className="form-checkbox text-green-500"
              />
              <span className="text-white">Patient</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isDoctor}
                onChange={() => {
                  setIsDoctor(!isDoctor);
                  setIsPatient(false);
                }}
                className="form-checkbox text-green-500"
              />
              <span className="text-white">Doctor</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          Sign Up
        </button>
      </form>

      <p className="text-white mt-4">
        Already have an account?{" "}
        <button onClick={toggleAuthMode} className="text-green-500 hover:underline">
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;