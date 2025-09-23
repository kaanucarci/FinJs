import Image from "next/image";
import BudgetSettingsModal from "@/components/Dashboard/Budgets/BudgetSettingsModal";
import { useState } from "react";
export default function ManageBudgetSettings() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <div className="bg-white/60 backdrop-blur-sm border-b border-slate-200/50 shadow-sm">
      <div className="overflow-hidden transition-all duration-500 ease-in-out transform scale-y-100 opacity-100 max-h-screen origin-top">
        <div className="max-w-4xl mx-auto p-6 flex flex-col lg:flex-row justify-center items-center gap-4">
          <div className="w-50">
            <button onClick={() => setIsOpen(true)} className="w-full  bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
              <Image
                src="/setting.svg"
                width={20}
                height={20}
                alt="setting icon"
              />
              Butce Ayarlari
            </button>
          </div>
        </div>
      </div>
    </div>
    <BudgetSettingsModal  isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  );
}
