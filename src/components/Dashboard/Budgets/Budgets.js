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
        pageSize: 5,
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
                fetchBudgetItems(defaultBudget.id, { BudgetYear: budgetYear, page: 1, pageSize: 5 })
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
                pageSize: paginationData.pageSize || 5,
                totalCount: paginationData.totalCount || 0
            });
        }
    };

    const handleMonthSelect = (monthObj, index) => {
        fetchBudgetInfo(monthObj.id || monthObj.budgetId);
        fetchBudgetItems(monthObj.id || monthObj.budgetId, { BudgetYear: budgetYear, page: 1, pageSize: 5 })
        setActiveIndex(index);
        setPagination(prev => ({ ...prev, page: 1 })); 
    };

    const handlePageChange = (newPage) => {
        console.log('handlePageChange called with:', newPage);
        console.log('selectedBudget:', selectedBudget);
        
        if (!selectedBudget || !selectedBudget.budgetId) {
            console.log('No selectedBudget or budgetId, returning');
            return;
        }
        
        const budgetId = selectedBudget.budgetId;
        console.log('Fetching budget items for page:', newPage);
        
        fetchBudgetItems(budgetId, { 
            BudgetYear: budgetYear, 
            page: newPage, 
            pageSize: pagination.pageSize 
        });
        
        // Pagination state'ini guncelle
        setPagination(prev => ({
            ...prev,
            page: newPage
        }));
    };

    

    // Token yoksa hicbir sey render etme
    if (!token) {
        return null;
    }

    // Optimistic update fonksiyonlari
    const handleBudgetUpdate = (updatedBudget) => {
        setSelectedBudget(updatedBudget);
    };

    const handleBudgetItemAdd = (newItem) => {
        // BudgetItems state'ini guncelle
        setBudgetItems(prev => {
            if (Array.isArray(prev) && prev.length > 0 && prev[0] && prev[0].expenses) {
                const updated = [...prev];
                const currentExpenses = updated[0].expenses;
                const pageSize = updated[0].pageSize || 5;
                
                // Eger ilk sayfada yer varsa, yeni item'i ekle
                if (currentExpenses.length < pageSize) {
                    updated[0] = {
                        ...updated[0],
                        expenses: [newItem, ...currentExpenses]
                    };
                } else {
                    // Ilk sayfa doluysa, yeni item'i ekle ama sayfa boyutunu koru
                    const newExpenses = [newItem, ...currentExpenses];
                    updated[0] = {
                        ...updated[0],
                        expenses: newExpenses.slice(0, pageSize) // Sadece ilk 5 item'i tut
                    };
                }
                return updated;
            } else {
                // Eger prev bos veya farkli formatta ise
                return [{
                    expenses: [newItem],
                    page: 1,
                    pageSize: 5,
                    totalCount: 1
                }];
            }
        });
        
        // Pagination'i guncelle
        setPagination(prev => ({
            ...prev,
            totalCount: prev.totalCount + 1
        }));
        
        // Budget info'yu da guncelle
        if (selectedBudget) {
            const updatedBudget = { ...selectedBudget };
            if (newItem.expenseType === 1) {
                updatedBudget.expense = (updatedBudget.expense || 0) + parseFloat(newItem.amount);
                updatedBudget.amount = (updatedBudget.amount || 0) - parseFloat(newItem.amount);
            } else {
                updatedBudget.saving = (updatedBudget.saving || 0) + parseFloat(newItem.amount);
                updatedBudget.amount = (updatedBudget.amount || 0) + parseFloat(newItem.amount);
            }
            setSelectedBudget(updatedBudget);
        }
    };

    const handleBudgetItemUpdate = (updatedItem) => {
        // BudgetItems state'ini guncelle
        setBudgetItems(prev => {
            if (Array.isArray(prev) && prev.length > 0 && prev[0] && prev[0].expenses) {
                const updated = [...prev];
                updated[0] = {
                    ...updated[0],
                    expenses: updated[0].expenses.map(item => 
                        item.id === updatedItem.id ? updatedItem : item
                    )
                };
                return updated;
            }
            return prev;
        });
        
        // Budget info'yu da guncelle
        if (selectedBudget) {
            const updatedBudget = { ...selectedBudget };
            // Eski item'i bul ve farki hesapla
            const oldItem = budgetItems[0]?.expenses?.find(item => item.id === updatedItem.id);
            if (oldItem) {
                const amountDiff = parseFloat(updatedItem.amount) - parseFloat(oldItem.amount);
                const typeChanged = oldItem.expenseType !== updatedItem.expenseType;
                
                if (typeChanged) {
                    // Tip degistiyse eski tutari geri al, yeni tutari ekle
                    if (oldItem.expenseType === 1) {
                        updatedBudget.expense = (updatedBudget.expense || 0) - parseFloat(oldItem.amount);
                        updatedBudget.amount = (updatedBudget.amount || 0) + parseFloat(oldItem.amount);
                    } else {
                        updatedBudget.saving = (updatedBudget.saving || 0) - parseFloat(oldItem.amount);
                        updatedBudget.amount = (updatedBudget.amount || 0) - parseFloat(oldItem.amount);
                    }
                    
                    if (updatedItem.expenseType === 1) {
                        updatedBudget.expense = (updatedBudget.expense || 0) + parseFloat(updatedItem.amount);
                        updatedBudget.amount = (updatedBudget.amount || 0) - parseFloat(updatedItem.amount);
                    } else {
                        updatedBudget.saving = (updatedBudget.saving || 0) + parseFloat(updatedItem.amount);
                        updatedBudget.amount = (updatedBudget.amount || 0) + parseFloat(updatedItem.amount);
                    }
                } else {
                    // Tip ayniysa sadece farki ekle/cikar
                    if (updatedItem.expenseType === 1) {
                        updatedBudget.expense = (updatedBudget.expense || 0) + amountDiff;
                        updatedBudget.amount = (updatedBudget.amount || 0) - amountDiff;
                    } else {
                        updatedBudget.saving = (updatedBudget.saving || 0) + amountDiff;
                        updatedBudget.amount = (updatedBudget.amount || 0) + amountDiff;
                    }
                }
            }
            setSelectedBudget(updatedBudget);
        }
    };

    const handleBudgetItemDelete = (deletedItemId) => {
        // BudgetItems state'ini guncelle
        setBudgetItems(prev => {
            if (Array.isArray(prev) && prev.length > 0 && prev[0] && prev[0].expenses) {
                const updated = [...prev];
                updated[0] = {
                    ...updated[0],
                    expenses: updated[0].expenses.filter(item => item.id !== deletedItemId)
                };
                return updated;
            }
            return prev;
        });
        
        // Pagination'i guncelle
        setPagination(prev => ({
            ...prev,
            totalCount: prev.totalCount - 1
        }));
        
        // Budget info'yu da guncelle
        if (selectedBudget) {
            const deletedItem = budgetItems[0]?.expenses?.find(item => item.id === deletedItemId);
            if (deletedItem) {
                const updatedBudget = { ...selectedBudget };
                if (deletedItem.expenseType === 1) {
                    updatedBudget.expense = (updatedBudget.expense || 0) - parseFloat(deletedItem.amount);
                    updatedBudget.amount = (updatedBudget.amount || 0) + parseFloat(deletedItem.amount);
                } else {
                    updatedBudget.saving = (updatedBudget.saving || 0) - parseFloat(deletedItem.amount);
                    updatedBudget.amount = (updatedBudget.amount || 0) - parseFloat(deletedItem.amount);
                }
                setSelectedBudget(updatedBudget);
            }
        }
    };

    return (
        <>
            <BudgetMonths budgetMonths = {budgetMonths} onMonthSelect={handleMonthSelect} activeIndex={activeIndex} budgetYear={budgetYear}/>
            <BudgetInfo  
                budgetInfo={selectedBudget} 
                token={token} 
                onBudgetUpdate={handleBudgetUpdate}
                onBudgetItemAdd={handleBudgetItemAdd}
            />
            <BudgetItems 
                budgetItems={budgetItems} 
                token={token} 
                pagination={pagination}
                onPageChange={handlePageChange}
                onBudgetItemUpdate={handleBudgetItemUpdate}
                onBudgetItemDelete={handleBudgetItemDelete}
            />
        </>
    )
}

export default Budgets;