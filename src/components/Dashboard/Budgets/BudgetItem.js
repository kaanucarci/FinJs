import Image from "next/image";
import EditBudgetModal from "./EditBudgetModal";
import { useState } from "react";

export default function BudgetItem() {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="border-b w-full border-[#e5e7eb] py-4 px-2 lg:px-6 last:border-b-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-14 gap-4 w-full">
          <div className="flex flex-row lg:flex-col items-center justify-start gap-1 lg:w-20">
            <span className="text-[12px] lg:text-3xl text-black">28</span>
            <span className="text-[12px] lg:text-xs text-gray-700 whitespace-nowrap">
              TEM 2025
            </span>
            <span className="text-[12px] lg:text-xs text-gray-700">15:51</span>
          </div>

          <div className="flex flex-col justify-center gap-2 w-full">
            <div className="flex items-center justify-between w-full">
              <span className="text-sm lg:text-base text-black font-semibold">
                Harcama Islemi
              </span>
              <span className="text-sm font-semibold lg:text-base text-red-800">
                - 3.000 TL
              </span>
            </div>
            <span className="text-[12px] lg:text-sm text-gray-600 text-start w-full">
              3.000 TL Karsiliginda Market Harcamasi
            </span>
          </div>
        </div>
        <div className="w-full lg:w-auto flex items-end justify-end">
          <button className="flex items-center justify-center rounded border hover:bg-gray-200 transition duration-200 border-[#e5e7eb] p-2" onClick={() => setIsOpen(true)}>
            <Image src={"/invoice.svg"} width={15} height={15} alt="invoice" />
          </button>
        </div>
      </div>
      
      <EditBudgetModal  isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  );
}
