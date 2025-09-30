"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../components/AuthProvider";
import { useRouter } from "next/navigation";
import { UserLogin } from "../../api/api";
import Image from "next/image";


export default function LoginPage() {
  const router = useRouter();
  const { login, token, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && token) {
      router.push("/");
    }
  }, [token, loading, router]);

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
      console.error(err);
      setError("Login failed. Server error.");
    }
  };

  if (loading || token) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <div className="text-lg">Yukleniyor...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 bg-[url('/bg_pattern.png')] bg-cover bg-center">
      <div className="w-full max-w-md p-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40">
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          {/* Logo */}
          <Image
            className="mb-8 drop-shadow-lg"
            src="/finjs_logo.png"
            alt="Logo"
            width={160}
            height={50}
          />

          {/* Error Message */}
          {error && (
            <div className="w-full text-center text-red-700 bg-red-200/50 px-4 py-2 rounded-lg mb-5">
              {error}
            </div>
          )}

          <div className="relative w-full mb-4">
            <Image
              src="/people.svg"
              width={20}
              height={20}
              alt="user icon"
              className="absolute left-3 top-3 "
            />
            <input
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#004caa] transition bg-white/50 backdrop-blur-sm placeholder-gray-600"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative w-full mb-6">
            <Image
                src="/lock.svg"
                width={20}
                height={20}
                alt="user icon"
                className="absolute left-3 top-3 "
              />
            <input
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#004caa] transition bg-white/50 backdrop-blur-sm placeholder-gray-600"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#004caa]/80 hover:bg-[#004caa] text-white font-semibold py-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#004caa]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
