"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { LOGIN_URL } from "@/utils/urlConstants";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState("email"); // email | verify | reset
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(120);
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Kod gönderimi simülasyonu
  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Lutfen e-posta adresinizi girin.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simule API
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("Dogrlama kodu e-posta adresinize gonderildi.");
      setShowModal(true);
      setStep("verify");
      setCountdown(120);
    } catch {
      toast.error("E-posta gonderimi basarisiz oldu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    let timer;
    if (showModal && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [showModal, countdown]);

  // Kod dogrulama
  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (code === "123456") {
      toast.success("Kod dogrulandi!");
      setShowModal(false);
      setStep("reset");
    } else {
      toast.error("Kod yanlis, lutfen tekrar deneyin.");
    }
  };

  // Yeni sifre olusturma
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      toast.error("Sifre en az 6 karakter olmalidir.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Sifreler eslesmiyor.");
      return;
    }

    // Simule API
    await new Promise((res) => setTimeout(res, 1000));
    toast.success("Sifreniz basariyla guncellendi!");
    setTimeout(() => router.push(LOGIN_URL), 1500);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-br bg-gray-200 ">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-white/40 backdrop-blur-lg">
          <form
            onSubmit={
              step === "email"
                ? handleSendEmail
                : step === "reset"
                ? handleResetPassword
                : (e) => e.preventDefault()
            }
            className="flex flex-col items-center"
          >
            {/* Logo */}
            <Image
              className="mb-6 drop-shadow-lg"
              src="/finjs_logo.png"
              alt="Logo"
              width={160}
              height={50}
            />

            {step === "email" && (
              <>
                <p className="text-gray-500 text-sm mb-6 text-center">
                  Lutfen e-posta adresinizi girin. Dogrulama kodu gonderilecektir.
                </p>

                <div className="relative w-full mb-6">
                  <Image
                    src="/people.svg"
                    width={20}
                    height={20}
                    alt="mail icon"
                    className="absolute left-3 top-3 z-10"
                  />
                  <input
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#004caa] transition bg-white/50 placeholder-gray-600"
                    placeholder="E-posta adresi"
                    value={email}
                    type="email"
                    onChange={(e) =>
                      setEmail(e.target.value.replace(/\s/g, ""))
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={!email || isSubmitting}
                  className="w-full bg-[#004caa]/80 hover:bg-[#004caa] text-white font-semibold py-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-[1.02]"
                >
                  {isSubmitting ? "Gonderiliyor..." : "Kod Gonder"}
                </button>
              </>
            )}

            {step === "reset" && (
              <>
                <p className="text-gray-500 text-sm mb-6 text-center">
                  Yeni sifrenizi belirleyin ve giris yapin.
                </p>

                <div className="w-full mb-4">
                  <input
                    type="password"
                    placeholder="Yeni sifre"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#004caa] outline-none"
                  />
                </div>
                <div className="w-full mb-6">
                  <input
                    type="password"
                    placeholder="Yeni sifre tekrar"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#004caa] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#004caa]/80 hover:bg-[#004caa] text-white font-semibold py-2 rounded-lg shadow-lg transition duration-300"
                >
                  Sifreyi Guncelle
                </button>
              </>
            )}

            <div className="text-center mt-6 text-sm text-gray-700">
              <Link href={LOGIN_URL} className="text-[#004caa] font-medium">
                Giris sayfasina don
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* 🔐 Kod dogrulama modali */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl">
            <h3 className="text-xl font-semibold text-[#004caa] mb-3 text-center">
              Dogrulama Kodu
            </h3>
            <p className="text-gray-600 text-sm mb-4 text-center">
              E-posta adresinize gelen 6 haneli kodu girin
            </p>

            <form onSubmit={handleVerifyCode}>
              <input
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className="w-full text-center text-lg tracking-widest font-semibold border rounded-lg py-2 focus:ring-2 focus:ring-[#004caa] outline-none mb-3"
                placeholder="______"
              />

              <p className="text-center text-sm text-gray-500 mb-4">
                Kodun suresi:{" "}
                <span className="font-semibold text-[#004caa]">
                  {countdown}s
                </span>
              </p>

              <button
                type="submit"
                className="w-full bg-[#004caa]/90 hover:bg-[#004caa] text-white font-semibold py-2 rounded-lg transition"
              >
                Dogrula
              </button>
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-3 text-center text-gray-500 hover:text-[#004caa] text-sm"
            >
              Iptal Et
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}
