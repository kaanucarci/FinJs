"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthProvider";
import { useRouter } from "next/navigation";
import { UserLogin } from "../../api/api";

export default function LoginPage() {
  const router = useRouter();
  const { token, login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await UserLogin(username, password);

      if (!response.token) {
        setError(response.message || "Login failed");
        return;
      }

      login(response.token);
      router.push("/");
    } catch (err) {
      console.log(err);

      setError("Login failed. Server error.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back 👋</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <input
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full px-4 py-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}
