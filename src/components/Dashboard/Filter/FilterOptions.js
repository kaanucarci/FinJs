
export default function FilterOptions({ isOpen }) {
  return (
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out transform ${
        isOpen
          ? "scale-y-100 opacity-100 max-h-screen"
          : "lg:scale-y-100 lg:max-h-full lg:opacity-100 max-h-0 scale-y-0 opacity-0"
      } origin-top`}
    >
      <div className="max-w-4xl mx-auto p-6 flex flex-col lg:flex-row justify-center items-end gap-4">
        <div className="w-full">
          <label
            htmlFor="startDate"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Baslangic Tarihi
          </label>
          <input
            type="date"
            id="startDate"
            name="start_date"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="endDate"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Bitis Tarihi
          </label>
          <input
            type="date"
            id="endDate"
            name="end_date"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="expenseType"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Islem Tipi
          </label>
            <select 
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm" 
              name="expense_type"
              id="expenseType"
            >
                <option value="">Tum Islemler</option>
                <option value={1}>Sadece Harcamalar</option>
                <option value={2}>Sadece Birikimler</option>
            </select>
        </div>
        <div className="w-full">
          <label
            htmlFor="year"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Butce Yili
          </label>
          <select 
            name="year" 
            id="year" 
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
          >
            <option value="2025">2025</option>
          </select>
        </div>
        <div className="w-full">
          <button className="w-full  bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m1.15-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
              />
            </svg>
            Filtrele
          </button>
        </div>
      </div>
    </div>
  );
}
