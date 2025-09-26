"use client";

import BudgetSettingsModal from "@/components/Dashboard/Budgets/BudgetSettingsModal";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import SearchModal from "@/components/Dashboard/Header/SearchModal";

export default function Header({ budgetYear, setBudgetYear, availableYears = [] }) {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setSearchIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
    <header className="flex items-center justify-between bg-white/80 backdrop-blur-md p-4 px-5 border-b border-slate-200/50 shadow-modern sticky top-0 z-10">
      <div className="flex gap-5">
        <Image src="/finjs_logo.png" alt="Logo" width={150} height={45} className="drop-shadow-sm" />
        
        
        <button
          type="button"
          className="btn border p-2 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 rounded-xl border-slate-200 shadow-sm hover:shadow-md group"
          onClick={() => setSearchIsOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#64748b"
            width="25"
            height="25"
            className="group-hover:stroke-blue-600 transition-colors duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m1.15-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            />
          </svg>
        </button>
        <SearchModal isSearchOpen={isSearchOpen} setSearchIsOpen={setSearchIsOpen} />
      </div>
      <div className="gap-5 relative inline-block text-left" ref={dropdownRef}>
        <button
          type="button"
          className="btn border p-2 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 rounded-xl border-slate-200 shadow-sm hover:shadow-md group"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#64748b"
            width="25"
            height="25"
            className="group-hover:stroke-blue-600 transition-colors duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-md border border-slate-200/50 rounded-xl shadow-modern-lg z-50 animate-in slide-in-from-top-2 duration-200">
            <ul className="p-1">
              <li className="border-b border-slate-200/50">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-700 flex gap-1 justify-start items-center rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setIsOpen(true)}
                >
                  <Image
                    src="/setting.svg"
                    width={20}
                    height={20}
                    alt="setting icon"
                  />
                  Ayarlar
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex gap-1 justify-start items-center rounded-lg transition-all duration-200 font-medium"
                  onClick={() => logout()}
                >
                  <svg
                    className="transition-transform duration-200 group-hover:scale-110"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth={2}
                      d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                    ></path>
                  </svg>
                  Cikis Yap
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
    <BudgetSettingsModal  
      isOpen={isOpen} 
      setIsOpen={setIsOpen}
      budgetYear={budgetYear}
      setBudgetYear={setBudgetYear}
      availableYears={availableYears}
    />
    </>
  );
}
