"use client";
import React, { useEffect, useRef, useState } from "react";
import BudgetMonths from "@/components/Dashboard/Budgets/BudgetMonths";
import BudgetInfo from "@/components/Dashboard/Budgets/BudgetInfo";
import BudgetItems from "./BudgetItems";
import { useAuth } from "@/components/AuthProvider";
import { UseGetBudgets } from "@/api/api";


const Budgets = () => {

    const [budgetMonths, setBudgetMonths] = useState([]);
    const { token } = useAuth();
    const hasFetched = useRef(false);
      
    useEffect(() => {
      if (!token || hasFetched.current) return;
    
      hasFetched.current = true;
    
      async function fetchBudgets() {
        const data = await UseGetBudgets(token);
        setBudgetMonths(data);
      }
    
      fetchBudgets();
    }, [token]);

    console.log(budgetMonths);
    
    

    return (
       <>
       <BudgetMonths budgetMonths = {budgetMonths}/>
       <BudgetInfo />
       <BudgetItems />
       </>
    )
}

export default Budgets;
