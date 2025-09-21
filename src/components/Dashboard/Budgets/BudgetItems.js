import BudgetItem from "./BudgetItem";


export default function BudgetItems({budgetItems , token, fetchBudgetItems}) {

    const { expenses = [], savings = [] } = budgetItems[0] || {};
    const merged = [...expenses, ...savings];

    const sortedItems = merged.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
    );

    return (
    <div className="max-w-7xl mx-auto lg:p-6 p-2 flex flex-row justify-center items-center gap-5">
        <div className="w-full shadow-modern-lg bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6">
            <div className="flex items-start justify-center flex-col w-full">
                <BudgetItem budgetItem={sortedItems} token={token} fetchBudgetItems={fetchBudgetItems} />
            </div>
        </div>
    </div>
  );
}
