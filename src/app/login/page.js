"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthProvider";
import { useRouter } from "next/navigation";
import { UserLogin } from "../../api/api";
import Image from "next/image";

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
    <div className="flex items-center justify-center h-screen bg-gray-100 p-3">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 flex rounded-lg shadow-md w-full max-w-md flex-col items-center justify-center"
      >
           <Image
           className="mb-6"
          src="/finjs_logo.png"
          alt="Logo"
          width={150}
          height={45}
        />
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <input
          className="!w-full form-input mb-3  "
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="!w-full form-input mb-5 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-[#004caa] transaction duration-500 hover:bg-blue-700 text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
        >
          Login
        </button>
      </form>
    </div>
  );
}
