import {useRef} from "react";
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
            <h2 className="text-lg font-semibold mb-4">Butce Duzenle</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label  
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700">
                  Butce Yili
                </label>
                  <input
                      type="number"
                      id="year"
                      required
                      ref={budgetYear}
                      name="year"
                      defaultValue={budgetInfo?.year}
                      className="!w-full form-input"
                      placeholder="Orn: 80000"
                  />
              </div>
              <div className="mb-4">
                <label  
                  htmlFor="month"
                  className="block text-sm font-medium text-gray-700">
                  Butce Ayi
                </label>
                <select name="month" id="month" className="!w-full form-input" defaultValue={budgetInfo?.month || ""} ref={budgetMonth}>
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
                    <option value={12}>Aralik</option>
                </select>
              </div>
              <div className="mb-4">
                <label  
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700">
                  Toplam Butce
                </label>
                <input
                  type="number"
                  id="amount"
                  ref={budgetAmount}
                  required
                  name="amount"
                  defaultValue={budgetInfo?.totalAmount}
                  className="!w-full form-input"
                  placeholder="Orn: 80000"
                />
              </div>

              
              <div className="mb-4">
                <button  className="bg-[#004caa] hover:bg-[#01387c] transaction duration-300 text-white py-2 px-3 w-full rounded-lg" type="submit">
                    Kaydet
                </button>
              </div>
              
            </form>
          </div>
        </div>
      )
    );
  }
  