import {UseAddBudgetItem} from "@/api/api";
import {useState} from "react";

export default function NewBudgetItem({ isOpen, setIsOpen, budgetItem, token }) {
    const [expenseType, setExpenseType] = useState("Expense");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const expenseType = formData.get("expense_type");
        const data = {
            budgetId : budgetItem.budgetId,
            amount : formData.get("amount"),
            description : formData.get("description"),
        }

        await UseAddBudgetItem(token, data, expenseType);
        setIsOpen(false);
    }

    return (
      isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#8a8a8a78] bg-opacity-40 p-3">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              x
            </button>
            <h2 className="text-lg font-semibold mb-4">Yeni Giris</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Harcama Tipini Seciniz
                </label>
                <div className="flex justify-start items-center gap-2">
                    <div className="flex gap-2">
                        <input type="radio" checked={expenseType === "Expense"} onChange={(e) => setExpenseType(e.target.value)} name="expense_type" id="expense" value="Expense"/>
                        <label htmlFor="expense" className="block text-sm font-medium text-gray-700">
                            Harcama
                        </label>
                    </div>
                    <div className="flex gap-2">
                        <input type="radio" checked={expenseType === "Saving"} onChange={(e) => setExpenseType(e.target.value)} name="expense_type" id="saving" value="Saving"/>
                        <label htmlFor="saving" className="block text-sm font-medium text-gray-700">
                            Birikim
                        </label>
                    </div>
                </div>
              </div>
              <div className="mb-4">
                <label  
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700">
                  Tutar
                </label>
                <input
                  type="number"
                  id="amount"
                  required
                  name="amount"
                  className="!w-full form-input"
                  placeholder="Tutar giriniz (3000 seklinde)"
                />
              </div>
              <div className="mb-4">
                <label  
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700">
                  Aciklama
                </label>
                <input
                  type="text"
                  id="description"
                  required
                  name="description"
                  className="!w-full form-input"
                  placeholder="Orn: 1000 TL degerinde oglen yemegi"
                />
              </div>

              
              <div className="mb-4">
                <button  className="bg-[#004caa] hover:bg-[#01387c] transaction duration-300 text-white py-2 px-3 w-full rounded-lg">
                    Kaydet
                </button>
              </div>
              
            </form>
          </div>
        </div>
      )
    );
  }
  