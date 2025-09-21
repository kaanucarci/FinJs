import {useRef} from "react";
import {createPortal} from "react-dom";
import {UseEditBudgetItem, UseDeleteBudgetItem} from "@/api/api";
import Swal from "sweetalert2";

export default function EditBudgetItem({ isOpen, setIsOpen, budgetItem , token, onSuccess }) {

    const amount = useRef();
    const description = useRef();
    const endPoint = budgetItem?.expenseType == 1 ? "Expense" : "Saving";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            amount: amount.current.value,
            description: description.current.value,
            budgetId : budgetItem.budgetId,
        };

        const updated = await UseEditBudgetItem(token, data, endPoint, budgetItem?.id);
        if (onSuccess) onSuccess(updated);
        setIsOpen(false);
    };

    const deleteItem = async () => {
        const result = await Swal.fire({
            title: "Emin misiniz?",
            text: "Bu ogeyi sileceksiniz, geri alamazsiniz!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Evet, sil!",
            cancelButtonText: "Vazgec"
        });

        if (!result.isConfirmed) return;

        UseDeleteBudgetItem(token, endPoint, budgetItem.id);

        if (onSuccess) onSuccess(null);
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
          <h2 className="text-2xl font-bold mb-6 text-slate-900">
            {budgetItem?.expenseType === 1 ? "Harcama" : "Birikim"} Duzenle
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-slate-700 mb-2">
                Tutar (₺)
              </label>
              <input
                type="number"
                id="amount"
                required
                ref={amount}
                defaultValue={budgetItem?.amount}
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
                defaultValue={budgetItem?.description}
                ref={description}
                required
                name="description"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                placeholder="Orn: Oglen yemegi"
              />
            </div>

            <div className="flex gap-3 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                    Kaydet
                </button>
                <button 
                  onClick={deleteItem} 
                  type="button" 
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                    Sil
                </button>
            </div>
          </form>
        </div>
      </div>,
      document.body
    );
  }
  