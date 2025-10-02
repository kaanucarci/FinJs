import { useCallback } from "react";
import { DEFAULT_PAGE_SIZE } from '@/utils/budgetConstants';
import { 
    updateBudgetAmount, 
    addExpenseToList, 
    createEmptyBudgetItems 
} from '../utils/budgetHelpers';

export const useBudgetHandlers = ({
    budgetYear,
    selectedBudget,
    budgetItems,
    pagination,
    setBudgetItems,
    setSelectedBudget,
    setActiveIndex,
    setPagination,
    fetchBudgetInfo,
    fetchBudgetItems
}) => {
    const handleMonthSelect = useCallback((monthObj, index) => {
        const budgetId = monthObj.id || monthObj.budgetId;
        fetchBudgetInfo(budgetId);
        fetchBudgetItems(budgetId, { 
            BudgetYear: budgetYear, 
            page: 1, 
            pageSize: DEFAULT_PAGE_SIZE 
        });
        setActiveIndex(index);
        setPagination(prev => ({ ...prev, page: 1 }));
    }, [budgetYear, fetchBudgetInfo, fetchBudgetItems, setActiveIndex, setPagination]);

    const handlePageChange = useCallback((newPage) => {
        if (!selectedBudget?.budgetId) return;
        
        fetchBudgetItems(selectedBudget.budgetId, { 
            BudgetYear: budgetYear, 
            page: newPage, 
            pageSize: pagination.pageSize 
        });
        
        setPagination(prev => ({ ...prev, page: newPage }));
    }, [selectedBudget, budgetYear, pagination.pageSize, fetchBudgetItems, setPagination]);

    const handleBudgetUpdate = useCallback((updatedBudget) => {
        setSelectedBudget(updatedBudget);
    }, [setSelectedBudget]);

    const handleBudgetItemAdd = useCallback((newItem) => {
        setBudgetItems(prev => {
            if (Array.isArray(prev) && prev.length > 0 && prev[0]?.expenses) {
                const updated = [...prev];
                const { expenses, pageSize = DEFAULT_PAGE_SIZE } = updated[0];
                
                updated[0] = {
                    ...updated[0],
                    expenses: addExpenseToList(expenses, newItem, pageSize)
                };
                return updated;
            }
            return createEmptyBudgetItems(newItem);
        });
        
        setPagination(prev => ({
            ...prev,
            totalCount: prev.totalCount + 1
        }));
        
        if (selectedBudget) {
            const updatedBudget = updateBudgetAmount(selectedBudget, newItem, 'add');
            setSelectedBudget(updatedBudget);
        }
    }, [selectedBudget, setBudgetItems, setPagination, setSelectedBudget]);

    const handleBudgetItemUpdate = useCallback((updatedItem) => {
        const oldItem = budgetItems[0]?.expenses?.find(item => item.id === updatedItem.id);
        
        setBudgetItems(prev => {
            if (Array.isArray(prev) && prev.length > 0 && prev[0]?.expenses) {
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
        
        if (selectedBudget && oldItem) {
            let updatedBudget = { ...selectedBudget };
            updatedBudget = updateBudgetAmount(updatedBudget, oldItem, 'remove');
            updatedBudget = updateBudgetAmount(updatedBudget, updatedItem, 'add');
            setSelectedBudget(updatedBudget);
        }
    }, [budgetItems, selectedBudget, setBudgetItems, setSelectedBudget]);

    const handleBudgetItemDelete = useCallback((deletedItemId) => {
        const deletedItem = budgetItems[0]?.expenses?.find(item => item.id === deletedItemId);
        
        setBudgetItems(prev => {
            if (Array.isArray(prev) && prev.length > 0 && prev[0]?.expenses) {
                const updated = [...prev];
                updated[0] = {
                    ...updated[0],
                    expenses: updated[0].expenses.filter(item => item.id !== deletedItemId)
                };
                return updated;
            }
            return prev;
        });
        
        setPagination(prev => ({
            ...prev,
            totalCount: prev.totalCount - 1
        }));
        
        if (selectedBudget && deletedItem) {
            const updatedBudget = updateBudgetAmount(selectedBudget, deletedItem, 'remove');
            setSelectedBudget(updatedBudget);
        }
    }, [budgetItems, selectedBudget, setBudgetItems, setPagination, setSelectedBudget]);

    return {
        handleMonthSelect,
        handlePageChange,
        handleBudgetUpdate,
        handleBudgetItemAdd,
        handleBudgetItemUpdate,
        handleBudgetItemDelete
    };
};

