"use client";
import React, { useEffect, useRef, useState } from "react";
import BudgetMonths from "@/components/Dashboard/Budgets/BudgetMonths";
import BudgetInfo from "@/components/Dashboard/Budgets/BudgetInfo";
import BudgetItems from "./BudgetItems";
import { useAuth } from "@/components/AuthProvider";
import {UseGetBudgetInfo, UseGetBudgetItems, UseGetBudgets} from "@/api/api";


const Budgets = ({budgetYear}) => {

    const [budgetMonths, setBudgetMonths] = useState([]);
    const [selectedBudget, setSelectedBudget] = useState([]);
    const [budgetItems, setBudgetItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(() => new Date().getMonth());
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
        totalCount: 0
    });
    const { token } = useAuth();
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!token || hasFetched.current) return;

        hasFetched.current = true;

        async function fetchBudgets() {
            const data = await UseGetBudgets(token, budgetYear);
            setBudgetMonths(data);

            const currentMonth = new Date().getMonth() + 1;
            const defaultBudget = data.find(m => m.month === currentMonth);

            if (defaultBudget) {
                fetchBudgetInfo(defaultBudget.id);
                fetchBudgetItems(defaultBudget.id, { BudgetYear: budgetYear, page: 1, pageSize: 10 })
                const defaultIndex = data.findIndex(m => m.month === currentMonth);
                setActiveIndex(defaultIndex);
            }
        }

        fetchBudgets();
    }, [token]);

    const fetchBudgetInfo = async (budgetId) => {
        if (!token) return;
        const data = await UseGetBudgetInfo(token, budgetId, budgetYear);
        setSelectedBudget(data);
    };

    const fetchBudgetItems = async (budgetId, filterParams) => {
        if (!token) return;
        const data = await UseGetBudgetItems(token, filterParams, budgetId);
        setBudgetItems(data);
        
        const paginationData = Array.isArray(data) ? data[0] : data;
        
        if (paginationData && typeof paginationData === 'object') {
            setPagination({
                page: paginationData.page || 1,
                pageSize: paginationData.pageSize || 10,
                totalCount: paginationData.totalCount || 0
            });
        }
    };

    const handleMonthSelect = (monthObj, index) => {
        fetchBudgetInfo(monthObj.id || monthObj.budgetId);
        fetchBudgetItems(monthObj.id || monthObj.budgetId, { BudgetYear: budgetYear, page: 1, pageSize: 10 })
        setActiveIndex(index);
        setPagination(prev => ({ ...prev, page: 1 })); 
    };

    const handlePageChange = (newPage) => {
        if (!selectedBudget || !selectedBudget.id) return;
        
        const budgetId = selectedBudget.id;
        fetchBudgetItems(budgetId, { 
            BudgetYear: budgetYear, 
            page: newPage, 
            pageSize: pagination.pageSize 
        });
    };

    

    return (
        <>
            <BudgetMonths budgetMonths = {budgetMonths} onMonthSelect={handleMonthSelect} activeIndex={activeIndex} budgetYear={budgetYear}/>
            <BudgetInfo  budgetInfo={selectedBudget} token={token} />
            <BudgetItems 
                budgetItems={budgetItems} 
                token={token} 
                pagination={pagination}
                onPageChange={handlePageChange}
            />
        </>
    )
}

export default Budgets;