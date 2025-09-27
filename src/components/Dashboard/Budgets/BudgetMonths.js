import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const months = [
  "Ocak",
  "Subat",
  "Mart",
  "Nisan",
  "Mayis",
  "Haziran",
  "Temmuz",
  "Agustos",
  "Eylul",
  "Ekim",
  "Kasim",
  "Aralik",
];

export default function BudgetMonths({
  budgetMonths = [],
  onMonthSelect,
  activeIndex,
  budgetYear,
}) {
  const buttonsRef = useRef([]);

  const handleMonthClick = (index, month) => {
    if (onMonthSelect) onMonthSelect(month, index);
  };

  useEffect(() => {
    if (buttonsRef.current[activeIndex]) {
      setTimeout(() => {
        buttonsRef.current[activeIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }, 100);
    }
  }, [activeIndex, budgetMonths]);
  return (
    <div className="bg-white/60 backdrop-blur-sm border-b border-slate-200/50 shadow-sm relative">
      <div className="relative max-w-4xl mx-auto p-5">
        <span className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-red-700 shadow-red-500/25 border-red-600 scale-105 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
          {budgetYear}
        </span>
        <div className="p-4 flex flex-row justify-start items-center gap-3 overflow-auto">
          {budgetMonths && Array.isArray(budgetMonths) && budgetMonths.length > 0 ? 
            budgetMonths.map((month, index) => (
            <button
              key={month?.month - 1}
              disabled={index === activeIndex}
              ref={(el) => (buttonsRef.current[index] = el)}
              onClick={() => handleMonthClick(index, month)}
              className={`border p-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95
          ${
            index === activeIndex
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 border-blue-600 scale-105"
              : "hover:bg-blue-50 hover:border-blue-200 border-slate-200 text-slate-700 hover:text-blue-700 shadow-sm hover:shadow-md"
          }`}
            >
              {months[month?.month - 1]}
            </button>
          )) : (
            <div className="text-slate-500 text-sm">Veri yükleniyor...</div>
          )}
        </div>
      </div>
    </div>
  );
}
