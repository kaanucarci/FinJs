"use client";

import { useState } from "react";

const months = ["Ocak", "Subat", "Mart", "Nisan", "Mayis", "Haziran", "Temmuz", "Agustos", "Eylul", "Ekim", "Kasim", "Aralik"];

export default function BudgetMonths({ budgetMonths = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleMonthClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-[#fff] border-b border-[#e5e7eb]">
      <div className="max-w-4xl mx-auto p-6 flex flex-row lg:justify-center items-center gap-5 overflow-auto">
      <button className="bg-green-600 hover:bg-green-700 transition duration-300 text-white w-7 h-7 flex items-center justify-center rounded-full"> + </button>
        {Object.values(budgetMonths).map((month, index) => (
          <button
            key={index}
            onClick={() => handleMonthClick(index)}
            className={`btn border p-2 px-3 ${
              index === activeIndex
                ? "bg-[#004caa] text-white"
                : "hover:bg-[#f4f4f4]"
            } 
              transition duration-300 btn-sm text-sm rounded-lg border-[#e5e7eb]`}
          >
            {months[month.month - 1]}
          </button>
        ))}
      </div>
    </div>
  );
}
