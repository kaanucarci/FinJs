import { createPortal } from "react-dom";

export default function SearchModal({ isOpen, setIsOpen }) {
  return isOpen && createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-modern-xl p-8 w-full max-w-3xl relative border border-slate-200/50 animate-scale-in">
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors duration-200 p-2 hover:bg-slate-100 rounded-full"
          onClick={() => setIsOpen(false)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-slate-900">Arama</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Bir seyler ara..."
            className="w-full px-4 py-3  border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
          />
          <button className="absolute right-0 bg-gradient-to-r from-blue-600 rounded-tl-none rounded-bl-none to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl ">
              <svg
                className="text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                width={26}
                height={26}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.15-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
              </svg>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
