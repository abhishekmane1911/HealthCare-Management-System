import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LampContainer } from "../components/ui/Lamp";
import { login, register } from "../api";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPatient, setIsPatient] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setUsername(""); // Reset username on toggle
    setEmail(""); // Reset email on toggle
    setPassword(""); // Reset password on toggle
  };

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
      if (isLogin) {
        await login(email, password);
      } else {
        if (!username) {
          setError("Username is required.");
          return;
        }
        await register(username, email, password, isDoctor, isPatient);
      }
      alert("Success!");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <LampContainer className="w-full h-screen flex items-center justify-center pt-12 mb-12">
      <motion.div
        initial={{ opacity: 0.5, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="backdrop-blur-sm shadow-xl rounded-2xl p-8 max-w-sm w-full text-center min-h-[350px] transition-all duration-300 border mt-12"
      >
        <h2 className="text-2xl font-semibold text-white mb-4">
          {isLogin ? "Welcome Back!" : "Create an Account"}
        </h2>
        <div className="relative w-full">
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <label className="block text-white text-left">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full text-gray-300 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your username"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {!isLogin && (
              <div>
                <label className="block text-white text-left">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-gray-300 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-white text-left">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-gray-300 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Patient & Doctor Selection */}
            {!isLogin && (
              <div className="flex flex-col space-y-2">
                <label className="block text-white text-left">Select Role</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isPatient}
                      onChange={() => {
                        setIsPatient(!isPatient);
                        setIsDoctor(false); // Ensure only one is selected
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
                        setIsPatient(false); // Ensure only one is selected
                      }}
                      className="form-checkbox text-green-500"
                    />
                    <span className="text-white">Doctor</span>
                  </label>
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              type="submit"
            >
              {isLogin ? "Login" : "Sign Up"}
            </motion.button>
          </form>
        </div>
        <p className="text-white mt-4">
          {isLogin ? "New here?" : "Already have an account?"}
          <button
            className="text-green-500 hover:underline ml-1 font-semibold"
            onClick={toggleAuthMode}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </LampContainer>
  );
};

export default AuthPage;