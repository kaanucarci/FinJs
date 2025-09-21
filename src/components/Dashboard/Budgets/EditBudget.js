import {useRef} from "react";
import {createPortal} from "react-dom";
import {UseEditBudget} from "@/api/api";
import {toast} from "react-toastify";

export default function EditBudget({ isOpen, setIsOpen, budgetInfo , token, onSuccess}) {


    const budgetYear = useRef();
    const budgetMonth = useRef();
    const budgetAmount = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            year: budgetYear.current.value,
            month: budgetMonth.current.value,
            totalAmount: budgetAmount.current.value,
        };
        const updated = await UseEditBudget(token, data, budgetInfo.budgetId);
        if (onSuccess)
            onSuccess(updated);

        setIsOpen(false);
    };

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
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Butce Duzenle</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="year" className="block text-sm font-semibold text-slate-700 mb-2">
                Butce Yili
              </label>
              <input
                type="number"
                id="year"
                required
                ref={budgetYear}
                name="year"
                defaultValue={budgetInfo?.year}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                placeholder="Orn: 2024"
              />
            </div>
            <div>
              <label htmlFor="month" className="block text-sm font-semibold text-slate-700 mb-2">
                Butce Ayi
              </label>
              <select 
                name="month" 
                id="month" 
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm" 
                defaultValue={budgetInfo?.month || ""} 
                ref={budgetMonth}
              >
                  <option value={1}>Ocak</option>
                  <option value={2}>Subat</option>
                  <option value={3}>Mart</option>
                  <option value={4}>Nisan</option>
                  <option value={5}>Mayis</option>
                  <option value={6}>Haziran</option>
                  <option value={7}>Temmuz</option>
                  <option value={8}>Agustos</option>
                  <option value={9}>Eylul</option>
                  <option value={10}>Ekim</option>
                  <option value={11}>Kasim</option>
                  <option value={12}>Aralık</option>
              </select>
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-slate-700 mb-2">
                Toplam Butce (TL)
              </label>
              <input
                type="number"
                id="amount"
                ref={budgetAmount}
                required
                name="amount"
                defaultValue={budgetInfo?.totalAmount}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                placeholder="Orn: 10000"
              />
            </div>
            
            <div className="pt-4">
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]" type="submit">
                  Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.body
    );
  }
  