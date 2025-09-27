"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Dashboard/Header/Header";
import Budgets from "@/components/Dashboard/Budgets/Budgets";
import Footer from "@/components/Dashboard/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { UseGetBudgetYears } from "@/api/api";
import { useAuth } from "@/components/AuthProvider";
import { getCookie, setCookie } from "@/utils/cookie";

export default function MainLayout({ children }) {
  const { token } = useAuth();
  const [budgetYear, setBudgetYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeBudgetYear = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const years = await UseGetBudgetYears(token);
        if (years && Array.isArray(years)) {
          setAvailableYears(years);
          
          const cookieYear = getCookie('budgetYear');
          let selectedYear;
          
          if (cookieYear && years.includes(parseInt(cookieYear))) {
            selectedYear = parseInt(cookieYear);
          } else {
            const currentYear = new Date().getFullYear();
            selectedYear = years.includes(currentYear) ? currentYear : years[0];
          }
          
          setBudgetYear(selectedYear);
          setCookie('budgetYear', selectedYear.toString());
        }
      } catch (error) {
        console.error('Yillar yuklenirken hata:', error);
        setBudgetYear(new Date().getFullYear());
      } finally {
        setLoading(false);
      }
    };

    initializeBudgetYear();
  }, [token]);

  const handleBudgetYearChange = (newYear) => {
    setBudgetYear(newYear);
    setCookie('budgetYear', newYear.toString());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Yukleniyor...</div>
      </div>
    );
  }

  // Token yoksa hiçbir şey render etme
  if (!token) {
    return null;
  }

  return (
    <>
      <Header 
        budgetYear={budgetYear} 
        setBudgetYear={handleBudgetYearChange}
        availableYears={availableYears}
      />
      <Budgets budgetYear={budgetYear} />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
