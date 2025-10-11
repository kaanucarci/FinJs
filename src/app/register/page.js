"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { UserRegister } from "@/api/api";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { LOGIN_URL } from "@/utils/urlConstants";
import AuthLayout from "@/layouts/AuthLayout";

export default function RegisterPage() {
  const router = useRouter();
  const { login, token, loading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!loading && token) router.push("/");
  }, [token, loading, router]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) newErrors.name = "Isim zorunludur";
    if (!form.surname.trim()) newErrors.surname = "Soyisim zorunludur";
    if (!form.email.trim()) newErrors.email = "E-posta zorunludur";
    else if (!emailRegex.test(form.email))
      newErrors.email = "Gecerli bir e-posta girin";
    if (!form.password || form.password.length < 6)
      newErrors.password = "Sifre en az 6 karakter olmalidir";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await UserRegister(form);
      if (!response?.token) {
        toast.error(response?.message || "Kayit basarisiz");
        setIsSubmitting(false);
        return;
      }

      toast.success("Kayit basarili!");
      login(response.token);
      router.push("/");
    } catch (err) {
      console.error("Register error:", err);
      toast.error("Sunucu hatasi. Lutfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || token)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg text-gray-700">Yukleniyor...</div>
      </div>
    );

  return (
    <AuthLayout showLogo={false} maxWidth="max-w-lg">
      <div className="w-full">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm mb-4">
            <Image
              src="/finjs_logo.png"
              alt="FinJS Logo"
              width={140}
              height={45}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Hesap Olustur
          </h2>
          <p className="text-sm text-gray-500">
            Finansal hedeflerinizi yonetmeye baslayin
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Adiniz"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? "border-red-300 focus:ring-red-500/20 focus:border-red-500 bg-red-50/50"
                    : "border-gray-200 focus:ring-[#004caa]/20 focus:border-[#004caa] bg-gray-50 hover:bg-white"
                } placeholder-gray-400 text-gray-800`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="surname"
                placeholder="Soyadiniz"
                value={form.surname}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                  errors.surname
                    ? "border-red-300 focus:ring-red-500/20 focus:border-red-500 bg-red-50/50"
                    : "border-gray-200 focus:ring-[#004caa]/20 focus:border-[#004caa] bg-gray-50 hover:bg-white"
                } placeholder-gray-400 text-gray-800`}
              />
              {errors.surname && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.surname}</p>
              )}
            </div>
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="E-posta adresiniz"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? "border-red-300 focus:ring-red-500/20 focus:border-red-500 bg-red-50/50"
                  : "border-gray-200 focus:ring-[#004caa]/20 focus:border-[#004caa] bg-gray-50 hover:bg-white"
              } placeholder-gray-400 text-gray-800`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Sifreniz"
                value={form.password}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                  errors.password
                    ? "border-red-300 focus:ring-red-500/20 focus:border-red-500 bg-red-50/50"
                    : "border-gray-200 focus:ring-[#004caa]/20 focus:border-[#004caa] bg-gray-50 hover:bg-white"
                } placeholder-gray-400 text-gray-800 pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#004caa] transition-colors"
              >
                <Image src={showPassword ? "/eye.svg" : "/view.svg"} width={22} height={22} alt="Show password"/>
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.password}</p>
            )}

            <div className="mt-3 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
              <p className="font-semibold text-[#004caa] text-sm mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Sifre kurallari
              </p>
              <ul className="space-y-1.5 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#004caa] mt-0.5">•</span>
                  <span>En az 6 karakter olmalidir</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#004caa] mt-0.5">•</span>
                  <span>Ozel karakter kullanabilirsiniz (!, @, #, vb.)</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
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
                Kayit Olusturuluyor...
              </div>
            ) : (
              "Hesap Olustur"
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-white text-gray-500">Zaten hesabiniz var mi?</span>
          </div>
        </div>

        <div className="text-center">
          <Link href={LOGIN_URL} className="inline-flex items-center justify-center w-full py-3 px-4 text-[#004caa] font-semibold hover:text-[#0066dd] transition-colors border border-gray-200 rounded-xl hover:bg-gray-50">
            Giris Yap
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
