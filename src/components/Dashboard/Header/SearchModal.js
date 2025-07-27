export default function SearchModal({ isOpen, setIsOpen }) {
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
          <h2 className="text-lg font-semibold mb-4">Arama</h2>
          <input
            type="text"
            placeHolder="Bir seyler ara"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
    )
  );
}
