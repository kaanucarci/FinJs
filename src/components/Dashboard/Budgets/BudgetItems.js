import BudgetItem from "./BudgetItem";


export default function BudgetItems({budgetItems}) {
  return (
    <div className="max-w-7xl mx-auto lg:p-6 p-2 flex flex-row justify-center items-center gap-5">
        <div className="w-full shadow-sm bg-white rounded p-4">
            <div className="flex items-start justify-center flex-col w-full p-1">
                {budgetItems?.map((budgetItem, index) => (
                    <BudgetItem key={index} budgetItem={budgetItem} />
                ))}
            </div>
        </div>
    </div>
  );
}
