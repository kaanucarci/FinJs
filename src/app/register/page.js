"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { UserRegister } from "@/api/api";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { LOGIN_URL } from "@/utils/urlConstants";

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
    <>
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
          {/* Logo & Baslik */}
          <div className="text-center mb-6">
            <Image
              src="/finjs_logo.png"
              alt="FinJS Logo"
              width={160}
              height={50}
              className="mx-auto mb-3"
            />
            <h2 className="text-2xl font-semibold text-[#004caa] mt-6">
              Bireysel Hesap
            </h2>
            <p className="text-gray-500 text-sm">
              Finansal hedeflerinizi yonetmeye baslayin
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Isim */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Isim"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.name
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-[#004caa]"
                }`}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Soyisim */}
            <div>
              <input
                type="text"
                name="surname"
                placeholder="Soyisim"
                value={form.surname}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.surname
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-[#004caa]"
                }`}
              />
              {errors.surname && (
                <p className="text-red-600 text-sm mt-1">{errors.surname}</p>
              )}
            </div>

            {/* E-posta */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="E-posta"
                value={form.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.email
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-[#004caa]"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Sifre */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Sifre"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.password
                      ? "border-red-400 focus:ring-red-400"
                      : "border-gray-300 focus:ring-[#004caa]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-500 hover:text-[#004caa]"
                >
                  <Image src={showPassword ? "/eye.svg" : "/view.svg"} width={25} height={25} alt="Show password"/>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}

              {/* Sifre Kurallari */}
              <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs text-gray-600">
                <p className="font-semibold text-[#004caa] mb-1">Sifre kurallari:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>En az 6 karakter olmalidir</li>
                  <li>Ozel karakter kullanabilirsiniz (!, @, #, vb.)</li>
                </ul>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#004caa] text-white py-2 rounded-lg font-semibold hover:bg-[#003b86] transition duration-300 disabled:opacity-60"
            >
              {isSubmitting ? "Kayit Olusturuluyor..." : "Kayit Ol"}
            </button>
          </form>

          {/* Alt Link */}
          <div className="text-center mt-5 text-sm text-gray-700">
            Zaten hesabiniz var mi?{" "}
            <Link href={LOGIN_URL} className="text-[#004caa] font-medium">
              Giris Yap
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        theme="colored"
      />
    </>
  );
}
