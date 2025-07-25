import { useState } from "react";

const months = ["Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
export default function BudgetMonths() {
    const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-[#fff] border-b border-[#e5e7eb]">
      <div className="max-w-4xl mx-auto p-6 flex flex-row lg:justify-center lg:items-center gap-5 overflow-auto">
        {months.map((month, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`btn border p-2  px-3 ${
                
                index === activeIndex
                  ? "bg-[#004caa] text-white"
                  : "hover:bg-[#f4f4f4]"} 
                  transition duration-300 rounded-lg border-[#e5e7eb]`}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
}
