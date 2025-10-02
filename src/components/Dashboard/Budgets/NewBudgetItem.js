import {UseAddBudgetItem} from "@/api/api";
import {useState} from "react";
import {createPortal} from "react-dom";

export default function NewBudgetItem({ isOpen, setIsOpen, budgetItem, token, onSuccess }) {
    const [expenseType, setExpenseType] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            budgetId : budgetItem.budgetId,
            amount : formData.get("amount"),
            description : formData.get("description"),
            expenseType : parseInt(formData.get("expense_type"))
        }

        const newItem = await UseAddBudgetItem(token, data);
        if (newItem && onSuccess) {
            onSuccess(newItem);
        }
        setIsOpen(false);
    }

    return isOpen && createPortal(
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-modern-xl p-8 w-full max-w-xl relative border border-slate-200/50 animate-scale-in">
          <button
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors duration-200 p-2 hover:bg-slate-100 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Yeni Giris</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Islem Tipini Seciniz
              </label>
              <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        checked={expenseType == 1} 
                        onChange={(e) => setExpenseType(e.target.value)} 
                        name="expense_type" 
                        id="expense" 
                        value={1}
                        className="w-4 h-4 text-red-600 border-slate-300 focus:ring-red-500"
                      />
                      <label htmlFor="expense" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Harcama
                      </label>
                  </div>
                  <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        checked={expenseType == 2} 
                        onChange={(e) => setExpenseType(e.target.value)} 
                        name="expense_type" 
                        id="saving" 
                        value={2}
                        className="w-4 h-4 text-green-600 border-slate-300 focus:ring-green-500"
                      />
                      <label htmlFor="saving" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Birikim
                      </label>
                  </div>
              </div>
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-slate-700 mb-2">
                Tutar (TL)
              </label>
              <input
                type="number"
                id="amount"
                required
                name="amount"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                placeholder="Orn: 1000"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
                Aciklama
              </label>
              <input
                type="text"
                id="description"
                required
                name="description"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                placeholder="Orn: Oglen yemegi"
              />
            </div>
            
            <div className="pt-4">
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.body
    );
  }
  