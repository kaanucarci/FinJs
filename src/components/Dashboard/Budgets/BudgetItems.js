import BudgetItem from "./BudgetItem";


export default function BudgetItems() {
  return (
    <div className="max-w-7xl mx-auto lg:p-6 p-2 flex flex-row justify-center items-center gap-5">
        <div className="w-full shadow-sm bg-white rounded p-4">
            <div className="flex justify-start gap-3">
                <select className="form-input" name="expense_type">
                    <option value="">Harcamalar ve Birikimler</option>
                    <option value={1}>Sadece Harcamalar</option>
                    <option value={2}>Sadece Birikimler</option>
                </select>
            </div>
            <div className="flex items-start justify-center flex-col mt-5 w-full p-1">
                <BudgetItem />
            </div>
        </div>
    </div>
  );
}
