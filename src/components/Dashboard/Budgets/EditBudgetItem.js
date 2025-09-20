import {useRef} from "react";
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
            text: "Bu öğeyi sileceksiniz, geri alamazsınız!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Evet, sil!",
            cancelButtonText: "Vazgeç"
        });

        if (!result.isConfirmed) return;

        UseDeleteBudgetItem(token, endPoint, budgetItem.id);

        if (onSuccess) onSuccess(null);
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
            <h2 className="text-lg font-semibold mb-4">Harcama Duzenle</h2>
            <form onSubmit={handleSubmit}>
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
                  ref={amount}
                  defaultValue={budgetItem?.amount}
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
                  defaultValue={budgetItem?.description}
                  ref={description}
                  required
                  name="description"
                  className="!w-full form-input"
                  placeholder="Orn: Oglen Yemegi"
                />
              </div>

              <div className="flex gap-2 ">
                  <div className="mb-4 w-full">
                      <button type="submit" className="bg-[#004caa]  hover:bg-[#01387c] transaction duration-300 text-white py-2 px-3 w-full rounded-lg">
                          Kaydet
                      </button>
                  </div>
                  <div className="mb-4 w-full">
                      <button onClick={deleteItem} type="button" className="bg-red-600  hover:bg-red-800 transaction duration-300 text-white py-2 px-3 w-full rounded-lg">
                          Sil
                      </button>
                  </div>
              </div>
            </form>
          </div>
        </div>
      )
    );
  }
  