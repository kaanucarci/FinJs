"use client";

import { useState } from "react";
import FilterOptions from "./FilterOptions";

export default function Filters() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white/60 backdrop-blur-sm border-b border-slate-200/50 shadow-sm">
      <div className="justify-center p-4 lg:hidden flex">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl flex gap-2 shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filtreler
        </button>
      </div>

      <FilterOptions isOpen={isOpen} />
    </div>
  );
}
