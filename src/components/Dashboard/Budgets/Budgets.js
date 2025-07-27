"use client";
import React from "react";
import BudgetMonths from "@/components/Dashboard/Budgets/BudgetMonths";
import BudgetInfo from "@/components/Dashboard/Budgets/BudgetInfo";
import BudgetItems from "./BudgetItems";

const Budgets = () => {
    return (
       <>
       <BudgetMonths/>
       <BudgetInfo/>
       <BudgetItems/>
       </>
    )
}

export default Budgets;
