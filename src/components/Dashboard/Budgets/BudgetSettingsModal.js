import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { UseCreateBudgetYear } from "@/api/api";
import { useAuth } from "@/components/AuthProvider";

export default function BudgetSettingsModal({ isOpen, setIsOpen, budgetYear, setBudgetYear, availableYears = [] }) {
  const { token } = useAuth();
  const [selectedYear, setSelectedYear] = useState(budgetYear);
  const [newYear, setNewYear] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSelectedYear(budgetYear);
      setNewYear("");
    }
  }, [isOpen, budgetYear]);

  const handleSave = async () => {
    if (selectedYear === budgetYear) {
      setIsOpen(false);
      return;
    }

    const result = await Swal.fire({
      title: 'Butce Yili Degistir',
      text: `Butce yilini ${budgetYear} yilindan ${selectedYear} yilina degistirmek istediginizden emin misiniz?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Evet, Degistir',
      cancelButtonText: 'Iptal'
    });

    if (result.isConfirmed) {
      setBudgetYear(selectedYear);
      setIsOpen(false);
      location.reload();
    }
  };

  const handleCreateYear = async () => {
    if (!newYear || newYear.length !== 4) {
      Swal.fire({
        title: 'Hata!',
        text: 'Gecerli bir yil giriniz (4 haneli)',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    const year = parseInt(newYear);
    if (availableYears.includes(year)) {
      Swal.fire({
        title: 'Hata!',
        text: 'Bu yil zaten mevcut',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Yeni Butce Yili Olustur',
      text: `${year} yili icin yeni butce olusturmak istediginizden emin misiniz?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Evet, Olustur',
      cancelButtonText: 'Iptal'
    });

    if (result.isConfirmed) {
      try {
        const response = await UseCreateBudgetYear(token, year);
        if (response) {
          setNewYear("");
          setIsOpen(false);
          location.reload();
        }
      } catch (error) {
        Swal.fire({
          title: 'Hata!',
          text: error?.message || 'Yil olusturulurken bir hata olustu',
          icon: 'error',
          timer: 2000,
          showConfirmButton: false
        });
      }
    }
  };

  return (
    isOpen &&
    createPortal(
      <div className="fixed inset-0 z-[11] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-modern-xl p-8 w-full max-w-3xl relative border border-slate-200/50 animate-scale-in">
          <button
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors duration-200 p-2 hover:bg-slate-100 rounded-full"
            onClick={() => setIsOpen(false)}
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
          <h5 className="text-lg mb-6 text-slate-900">Ayarlar</h5>

          <div className="flex flex-col gap-4 lg:flex-row items-end">
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
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Kaydet
            </button>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row items-end mt-10">
            <div className="w-full">
              <label
                htmlFor="year"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Yeni Butce Yili
              </label>
              <input
                name="year"
                id="year"
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                type="number"
                placeholder="Orn: 2027"
                min="2020"
                max="2100"
              />
            </div>
            <button 
              onClick={handleCreateYear}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Olustur
            </button>
          </div>
        </div>
      </div>,
      document.body
    )
  );
}
