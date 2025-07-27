export default function EditBudget({ isOpen, setIsOpen }) {
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
            <form>
              <div className="mb-4">
                <label  
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700">
                  Butce Yili
                </label>
                <select name="year" id="year" className="!w-full form-input">
                    <option value={2025}>2025</option>
                </select>
              </div>
              <div className="mb-4">
                <label  
                  htmlFor="month"
                  className="block text-sm font-medium text-gray-700">
                  Butce Ayi
                </label>
                <select name="month" id="month" className="!w-full form-input">
                    <option value={7}>Temmuz</option>
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
                  required
                  name="amount"
                  className="!w-full form-input"
                  placeholder="Orn: 80000"
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
  