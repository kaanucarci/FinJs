"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { UserLogin } from "@/api/api";
import Image from "next/image";
import Link from "next/link";
import { REGISTER_URL, FORGET_PASSWORD_URL } from "@/utils/urlConstants";
import AuthLayout from "@/layouts/AuthLayout";

export default function LoginPage() {
  const router = useRouter();
  const { login, token, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && token) {
      router.push("/");
    }
  }, [token, loading, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await UserLogin(email, password);

      if (!response?.token) {
        setError(response?.message || "Login failed");
        setIsSubmitting(false);
        return;
      }

      login(response.token);
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Giris basarisiz.");
      setIsSubmitting(false);
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
    <AuthLayout>
      <form onSubmit={handleLogin} className="w-full space-y-5">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Hosgeldiniz</h1>
          <p className="text-sm text-gray-500">Hesabiniza giris yapin</p>
        </div>

        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#004caa] transition-colors">
              <Image
                src="/people.svg"
                width={20}
                height={20}
                alt="user icon"
              />
            </div>
            <input
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#004caa]/20 focus:border-[#004caa] transition-all bg-gray-50 hover:bg-white placeholder-gray-400 text-gray-800"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
            />
          </div>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#004caa] transition-colors">
              <Image
                src="/lock.svg"
                width={20}
                height={20}
                alt="lock icon"
              />
            </div>
            <input
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#004caa]/20 focus:border-[#004caa] transition-all bg-gray-50 hover:bg-white placeholder-gray-400 text-gray-800"
              placeholder="Sifreniz"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!email || !password || isSubmitting}
          className="w-full bg-gradient-to-r from-[#004caa] to-[#0066dd] hover:from-[#003d8a] hover:to-[#0052b3] text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Yukleniyor...
            </div>
          ) : (
            "Giris Yap"
          )}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-white text-gray-500">veya</span>
          </div>
        </div>

        <div className="text-center space-y-3">
          <p className="text-sm text-gray-600">
            Henuz hesabin yok mu?{" "}
            <Link href={REGISTER_URL} className="text-[#004caa] font-semibold hover:text-[#0066dd] transition-colors">
              Kayit Ol
            </Link>
          </p>

          {error && (
            <p className="text-sm text-gray-600">
              <Link href={FORGET_PASSWORD_URL} className="text-[#004caa] font-semibold hover:text-[#0066dd] transition-colors">
                Sifremi Unuttum
              </Link>
            </p>
          )}
        </div>
      </form>
    </AuthLayout>
  );
}
