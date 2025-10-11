"use client";

import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthLayout({ 
  children, 
  showLogo = true, 
  maxWidth = "max-w-md" 
}) {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] p-4 sm:p-6 lg:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-indigo-50/40 to-purple-50/40 pointer-events-none"></div>
        
        <div className={`relative w-full ${maxWidth} bg-white rounded-3xl shadow-2xl shadow-blue-100/50 border border-gray-100/50 overflow-hidden`}>
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#004caa] via-[#0066dd] to-[#004caa]"></div>
          
          <div className="p-8 sm:p-10">
            <div className="flex flex-col items-center">
              {showLogo && (
                <div className="mb-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm">
                  <Image
                    className="drop-shadow-sm"
                    src="/finjs_logo.png"
                    alt="FinJS Logo"
                    width={140}
                    height={45}
                    priority
                  />
                </div>
              )}
              
              {children}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="!bg-white !shadow-lg !border !border-gray-100"
      />
    </>
  );
}

