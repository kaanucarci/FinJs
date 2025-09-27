import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import BudgetItem from "../Budgets/BudgetItem";
import { useAuth } from "@/components/AuthProvider";
import { UseSearchBudgetItems } from "@/api/api";
import Image from "next/image";

export default function SearchModal({ isSearchOpen, setSearchIsOpen }) {
  var keyword = useRef();
  const [budgetItems, setBudgetItems] = useState([]);
  const [showBody, setShowBody] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchTerm = keyword.current.value.trim();

    if (!searchTerm) {
      setSearchError("Bos Birakilamaz!");
      return;
    }

    if (searchTerm.length < 3) {
      setSearchError("En az 3 karakter girmelisiniz");
      return;
    }

    setSearchError("");
    setLoading(true);
    try {
      const result = await UseSearchBudgetItems(token, searchTerm);
      if (result) {
        setBudgetItems(result)
      } else {
        setBudgetItems([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setBudgetItems([]);
      setSearchError("Arama sirasinda bir hata olustu");
    } finally {
      setLoading(false);
    }

    setShowBody(true);
  };

  return (
    isSearchOpen &&
    createPortal(
      <div className="fixed inset-0 z-[11] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-modern-xl p-5 w-full max-w-3xl relative border border-slate-200/50 animate-scale-in max-h-[600px] overflow-auto">
          <button
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors duration-200 p-2 hover:bg-slate-100 rounded-full"
            onClick={() => setSearchIsOpen(false)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Arama</h2>
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="En az 3 karakter girin..."
              ref={keyword}
              className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-0 top-0 bg-gradient-to-r from-blue-600 rounded-tl-none rounded-bl-none to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width={26}
                  height={26}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m1.15-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                  />
                </svg>
              )}
            </button>
          </form>

          
          {searchError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{searchError}</p>
            </div>
          )}
          <div className={showBody ? "block" : "hidden"}>
            {loading ? (
              <div className="mt-6 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : budgetItems?.length > 0 ? (
              <div className="w-full shadow-modern-lg bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6 mt-6">
                <div className="flex items-start justify-center flex-col w-full">
                  <BudgetItem
                    budgetItem={budgetItems}
                    token={token}
                    readOnly={true}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full px-4 py-12">
                <div className="mb-6 relative">
                  <Image
                    src="/page-not-found.svg"
                    alt="No items"
                    width={150}
                    height={150}
                    className="mb-4"
                  />
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    Sonuc Bulunamadi!
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>,
      document.body
    )
  );
}
