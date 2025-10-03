import Image from "next/image";
import EditBudgetItem from "./EditBudgetItem";
import { useEffect, useState } from "react";
import EmptyState from "@/components/Dashboard/Budgets/EmptyState";

export default function BudgetItem({
  budgetItem,
  token,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setItem] = useState(Array.isArray(budgetItem) ? budgetItem : []);

  useEffect(() => {
    setItem(Array.isArray(budgetItem) ? budgetItem : []);
  }, [budgetItem]);

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  return (
    <>
      {data.length < 1 ? (
        <EmptyState />
      ) : (
        data.map((item) => {
          const date = new Date(item?.createdDate);
          const day = date.getDate();
          const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
          const month = months[date.getMonth()];

          const year = date.getFullYear();
          const hour = date.getHours().toString().padStart(2, "0");
          const minute = date.getMinutes().toString().padStart(2, "0");

          const safeAmount = Number(item?.amount);
          const displayAmount = Number.isFinite(safeAmount) ? safeAmount : 0;

          const displayDescription =
            typeof item?.description === "string" ? item.description : "";
          const isExpense = item?.expenseType === 1;

          return (
            <div
              key={item?.id ?? `${item?.expenseType}-fallback`}
              className="border-b w-full border-slate-200/50 py-6 px-2 lg:px-6 last:border-b-0 hover:bg-slate-50/50 transition-all duration-300 rounded-lg group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-14 gap-4 w-full">
                <div className="flex items-center justify-start lg:w-24">
                  <div className="flex flex-row lg:flex-col gap-1 items-center">
                    <span className="text-xs lg:text-3xl text-slate-900 lg:font-bold">
                      {day}
                    </span>
                    <span className="text-xs lg:text-sm text-slate-600 whitespace-nowrap font-medium">
                      {month} {year}
                    </span>
                    <span className="text-xs lg:text-sm text-slate-500">
                      {hour}:{minute}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-3 w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isExpense ? "bg-red-500" : "bg-green-500"
                        }`}
                      ></div>
                      <span className="text-sm lg:text-base text-slate-900 font-semibold">
                        {isExpense ? "Harcama" : "Birikim"} Islemi
                      </span>
                    </div>
                    <span
                      className={`text-sm font-bold lg:text-lg px-3 py-1 rounded-lg ${
                        isExpense
                          ? "text-red-700 bg-red-50"
                          : "text-green-700 bg-green-50"
                      }`}
                    >
                      {isExpense ? "-" : "+"} {displayAmount} TL 
                    </span>
                  </div>

                  <span className="text-sm lg:text-base text-slate-600 text-start w-full leading-relaxed">
                    {displayDescription}
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-auto flex items-end justify-end mt-2">
                <button
                  className="flex items-center justify-center rounded-xl border hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 border-slate-200 p-3 shadow-sm hover:shadow-md group"
                  onClick={() => handleEditClick(item)}
                >
                  <Image
                    src="/invoice.svg"
                    width={18}
                    height={18}
                    alt="invoice"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </button>
              </div>
            </div>
          );
        })
      )}

      <EditBudgetItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        budgetItem={selectedItem}
        token={token}
      />
    </>
  );
}
