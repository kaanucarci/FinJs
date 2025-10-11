"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import { LOGIN_URL } from "@/utils/urlConstants";
import AuthLayout from "@/layouts/AuthLayout";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState("email");
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(120);
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Lutfen e-posta adresinizi girin.");
      return;
    }

    setIsSubmitting(true);
    try {
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

    await new Promise((res) => setTimeout(res, 1000));
    toast.success("Sifreniz basariyla guncellendi!");
    setTimeout(() => router.push(LOGIN_URL), 1500);
  };

  return (
    <>
      <AuthLayout>
        <div className="w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Sifre Sifirlama</h1>
            <p className="text-sm text-gray-500">
              {step === "email" 
                ? "E-posta adresinize dogrulama kodu gonderilecek" 
                : "Yeni sifrenizi belirleyin"}
            </p>
          </div>

          <form
            onSubmit={
              step === "email"
                ? handleSendEmail
                : step === "reset"
                ? handleResetPassword
                : (e) => e.preventDefault()
            }
            className="space-y-5"
          >
            {step === "email" && (
              <>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#004caa] transition-colors">
                    <Image
                      src="/people.svg"
                      width={20}
                      height={20}
                      alt="mail icon"
                    />
                  </div>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#004caa]/20 focus:border-[#004caa] transition-all bg-gray-50 hover:bg-white placeholder-gray-400 text-gray-800"
                    placeholder="E-posta adresiniz"
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
                  className="w-full bg-gradient-to-r from-[#004caa] to-[#0066dd] hover:from-[#003d8a] hover:to-[#0052b3] text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                >
                  {isSubmitting ? "Gonderiliyor..." : "Dogrulama Kodu Gonder"}
                </button>
              </>
            )}

            {step === "reset" && (
              <>
                <div className="space-y-4">
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
                      type="password"
                      placeholder="Yeni sifreniz"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#004caa]/20 focus:border-[#004caa] transition-all bg-gray-50 hover:bg-white placeholder-gray-400 text-gray-800"
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
                      type="password"
                      placeholder="Sifrenizi tekrar girin"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#004caa]/20 focus:border-[#004caa] transition-all bg-gray-50 hover:bg-white placeholder-gray-400 text-gray-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#004caa] to-[#0066dd] hover:from-[#003d8a] hover:to-[#0052b3] text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
                >
                  Sifreyi Guncelle
                </button>
              </>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
            </div>

            <div className="text-center">
              <Link href={LOGIN_URL} className="text-sm text-gray-600 hover:text-[#004caa] font-medium transition-colors inline-flex items-center gap-2 mt-5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Giris sayfasina don
              </Link>
            </div>
          </form>
        </div>
      </AuthLayout>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="h-2 bg-gradient-to-r from-[#004caa] via-[#0066dd] to-[#004caa]"></div>
            
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl mb-4">
                  <svg className="w-8 h-8 text-[#004caa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Dogrulama Kodu
                </h3>
                <p className="text-sm text-gray-500">
                  E-posta adresinize gonderilen 6 haneli kodu girin
                </p>
              </div>

              <form onSubmit={handleVerifyCode} className="space-y-5">
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full text-center text-2xl tracking-[0.5em] font-bold border-2 border-gray-200 rounded-xl py-4 focus:ring-2 focus:ring-[#004caa]/20 focus:border-[#004caa] outline-none bg-gray-50 hover:bg-white transition-all text-gray-800"
                  placeholder="○ ○ ○ ○ ○ ○"
                />

                <div className="text-center py-3 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <p className="text-sm text-gray-600">
                    Kodun suresi:{" "}
                    <span className="font-bold text-[#004caa] text-base">
                      {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
                    </span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#004caa] to-[#0066dd] hover:from-[#003d8a] hover:to-[#0052b3] text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30"
                >
                  Dogrula
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors"
                >
                  Iptal Et
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
