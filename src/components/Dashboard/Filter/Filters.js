"use client";

import { useState } from "react";
import FilterOptions from "./FilterOptions";

export default function Filters() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-[#fff] border-b border-[#e5e7eb]">
      <div className="justify-center p-4 lg:hidden flex">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn bg-[#004caa] text-white px-4 py-2 rounded-lg flex gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#fff"
            width="25"
            height="25"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-4.35-4.35m1.15-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            />
          </svg>
          Filtreler
        </button>
      </div>

      <FilterOptions isOpen={isOpen} />
    </div>
  );
}
