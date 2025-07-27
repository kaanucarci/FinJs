"use client";
import React from "react";
import BudgetMonths from "@/components/Dashboard/Budgets/BudgetMonths";
import BudgetInfo from "@/components/Dashboard/Budgets/BudgetInfo";

const Budgets = () => {
    return (
       <>
       <BudgetMonths/>
       <BudgetInfo/>
       </>
    )
}

export default Budgets;
