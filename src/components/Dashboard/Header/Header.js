"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import SearchModal from "@/components/Dashboard/Header/SearchModal";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

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
    <header className="flex items-center justify-between bg-white p-4 px-5 border-b border-[#e5e7eb]">
      <div className="flex gap-5">
        <Image src="/finjs_logo.png" alt="Logo" width={150} height={45} />
        <button
          type="button"
          className="btn border p-2  hover:bg-[#f4f4f4] transition duration-300 rounded-lg border-[#e5e7eb]"
          onClick={() => setIsOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#c7c7c7"
            width="25"
            height="25"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m1.15-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            />
          </svg>
        </button>
        <SearchModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="gap-5 relative inline-block text-left" ref={dropdownRef}>
        <button
          type="button"
          className="btn border p-2  hover:bg-[#f4f4f4] transition duration-300 rounded-lg border-[#e5e7eb]"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#c7c7c7"
            width="25"
            height="25"
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
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <ul className="p-1">
              <li>
                <button
                  className="w-full text-left  px-4 py-2 text-sm text-[#E02424] hover:bg-gray-100 flex gap-1 justify-start align-center"
                  onClick={() => logout()}
                >
                  <svg
                    className="_o2IXcpM0qnG3JPReKus E9GV5sZJIbfO_GEQ_moc"
                    ariaHidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path
                      stroke="#E02424"
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
  );
}
