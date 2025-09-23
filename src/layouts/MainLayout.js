"use client";
import React, { useState } from "react";
import Header from "@/components/Dashboard/Header/Header";
import Budgets from "@/components/Dashboard/Budgets/Budgets";
import Footer from "@/components/Dashboard/Footer/Footer";
import { ToastContainer } from "react-toastify";

export default function MainLayout({ children }) {
  const [budgetYear, setBudgetYear] = useState(new Date().getFullYear());
  return (
    <>
      <Header budgetYear={budgetYear} setBudgetYear={setBudgetYear} />
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
