import { useEffect, useRef, useState } from "react";
import {toast} from "react-toastify";

const months = [
    "Ocak", "Subat", "Mart", "Nisan", "Mayis", "Haziran",
    "Temmuz", "Agustos", "Eylul", "Ekim", "Kasim", "Aralik"
];

export default function BudgetMonths({ budgetMonths = [], onMonthSelect, activeIndex }) {

    const buttonsRef = useRef([]);

    const handleMonthClick = (index, month) => {
        if (onMonthSelect)
            onMonthSelect(month, index);
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
        <div className="bg-[#fff] border-b border-[#e5e7eb]">
            <div className="max-w-4xl mx-auto p-6 flex flex-row justify-start items-center gap-3 overflow-auto">
                {Object.values(budgetMonths).map((month, index) => (
                    <button
                        key={month?.month - 1}
                        ref={(el) => (buttonsRef.current[index] = el)}
                        onClick={() => handleMonthClick(index, month)}
                        className={`border p-2 px-3 rounded-lg text-sm transition duration-300
              ${index === activeIndex
                            ? "bg-[#004caa] text-white  outline-2 outline-offset-2 outline-[#004caa]"
                            : "hover:bg-[#f4f4f4] border-[#e5e7eb]"
                        }`}
                    >
                        {months[month?.month - 1]}
                    </button>
                ))}
            </div>
        </div>
    );
}
