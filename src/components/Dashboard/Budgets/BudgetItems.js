import BudgetItem from "./BudgetItem";


export default function BudgetItems({budgetItems}) {

    const { expenses = [], savings = [] } = budgetItems[0] || {};
    const merged = [...expenses, ...savings];

    const sortedItems = merged.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
    );

    return (
    <div className="max-w-7xl mx-auto lg:p-6 p-2 flex flex-row justify-center items-center gap-5">
        <div className="w-full shadow-sm bg-white rounded p-4">
            <div className="flex items-start justify-center flex-col w-full p-1">
                <BudgetItem budgetItem={sortedItems} />
            </div>
        </div>
    </div>
  );
}
