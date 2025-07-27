
export default function FilterOptions({ isOpen }) {
  return (
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out transform ${
        isOpen
          ? "scale-y-100 opacity-100 max-h-screen"
          : "lg:scale-y-100 lg:max-h-full  max-h-0 scale-y-0 opacity-0 lg:opacity-100"
      } origin-top`}
    >
      <div className="max-w-4xl mx-auto p-6 flex flex-col lg:flex-row justify-center align-center gap-5 lg-hidden">
        <div className="mb-1">
          <label
            htmlFor="startDate"
            className="block text-xs font-light text-gray-700"
          >
            Baslangic Tarihi
          </label>
          <input
            type="date"
            id="startDate"
            name="start_date"
            className="form-input"
          />
        </div>
        <div className="mb-1">
          <label
            htmlFor="endDate"
            className="block text-xs font-light text-gray-700"
          >
            Bitis Tarihi
          </label>
          <input
            type="date"
            id="endDate"
            name="end_date"
            className="form-input"
          />
        </div>
        <div className="mb-1">
          <label
            htmlFor="min"
            className="block text-xs font-light text-gray-700"
          >
            Minimum Tutar
          </label>
          <input
            type="number"
            min={1}
            name="min"
            id="min"
            className="form-input"
            placeholder="Min"
          />
        </div>
        <div className="mb-1">
          <label
            htmlFor="max"
            className="block text-xs font-light text-gray-700"
          >
            Maksimum Tutar
          </label>
          <input
            type="number"
            name="max"
            min={1}
            id="max"
            className="form-input"
            placeholder="Max"
          />
        </div>
        <div className="mb-1">
          <label
            htmlFor="year"
            className="block text-xs font-light text-gray-700"
          >
            Butce Yili
          </label>
          <select name="year" id="year" className="form-input">
            <option value="2025">2025</option>
          </select>
        </div>
        <div className="mb-1">
          <button className="btn lg:mt-3.5 lg:w-auto w-full bg-[#004caa]  flex justify-center text-white text-center px-4 p-2 rounded-lg ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#fff"
              width="25"
              height="25"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 21l-4.35-4.35m1.15-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
