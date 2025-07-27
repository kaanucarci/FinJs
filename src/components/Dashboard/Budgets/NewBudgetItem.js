export default function NewBudgetItem({ isOpen, setIsOpen }) {
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
            <form>
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Harcama Tipini Seciniz
                </label>
                <div className="flex justify-start items-center gap-2">
                    <div className="flex gap-2">
                        <input type="radio" name="expense_type" id="expense" value="1"/>
                        <label htmlFor="expense" className="block text-sm font-medium text-gray-700">
                            Harcama
                        </label>
                    </div>
                    <div className="flex gap-2">
                        <input type="radio" name="expense_type" id="saving" value="2"/>
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
                  placeholder="Orn: Oglen Yemegi"
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
  