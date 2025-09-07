"use client";
import React, { useEffect, useRef, useState } from "react";
import BudgetMonths from "@/components/Dashboard/Budgets/BudgetMonths";
import BudgetInfo from "@/components/Dashboard/Budgets/BudgetInfo";
import BudgetItems from "./BudgetItems";
import { useAuth } from "@/components/AuthProvider";
import {UseGetBudgetInfo, UseGetBudgets} from "@/api/api";


const Budgets = () => {

    const [budgetMonths, setBudgetMonths] = useState([]);
    const [selectedBudget, setSelectedBudget] = useState([]);
    const [activeIndex, setActiveIndex] = useState(() => new Date().getMonth());
    const { token } = useAuth();
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!token || hasFetched.current) return;

        hasFetched.current = true;

        async function fetchBudgets() {
            const data = await UseGetBudgets(token);
            setBudgetMonths(data);

            const currentMonth = new Date().getMonth() + 1;
            const defaultBudget = data.find(m => m.month === currentMonth);

            if (defaultBudget) {
                fetchBudgetInfo(defaultBudget.id);
                const defaultIndex = data.findIndex(m => m.month === currentMonth);
                setActiveIndex(defaultIndex);
            }
        }

        fetchBudgets();
    }, [token]);

    const fetchBudgetInfo = async (budgetId) => {
        if (!token) return;
        const data = await UseGetBudgetInfo(token, budgetId);
        setSelectedBudget(data);
    };

    const handleMonthSelect = (monthObj, index) => {
        fetchBudgetInfo(monthObj.id || monthObj.budgetId);
        setActiveIndex(index);
    };

    return (
        <>
            <BudgetMonths budgetMonths = {budgetMonths} onMonthSelect={handleMonthSelect} activeIndex={activeIndex}/>
            <BudgetInfo  budgetInfo={selectedBudget} token={token} />
            <BudgetItems />
        </>
    )
}

export default Budgets;