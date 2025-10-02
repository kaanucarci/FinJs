import { useState, useCallback } from "react";
import { UseGetBudgetInfo, UseGetBudgetItems, UseGetBudgets } from "@/api/api";
import { DEFAULT_PAGE_SIZE } from '@/utils/budgetConstants';
import { 
    extractPaginationData, 
    getCurrentMonth 
} from '../utils/budgetHelpers';

export const useBudgetData = (token, budgetYear) => {
    const [budgetMonths, setBudgetMonths] = useState([]);
    const [selectedBudget, setSelectedBudget] = useState([]);
    const [budgetItems, setBudgetItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(() => new Date().getMonth());
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        totalCount: 0
    });

    const fetchBudgetInfo = useCallback(async (budgetId) => {
        if (!token) return;
        const data = await UseGetBudgetInfo(token, budgetId, budgetYear);
        setSelectedBudget(data);
    }, [token, budgetYear]);

    const fetchBudgetItems = useCallback(async (budgetId, filterParams) => {
        if (!token) return;
        const data = await UseGetBudgetItems(token, filterParams, budgetId);
        setBudgetItems(data);
        
        const paginationData = extractPaginationData(data);
        if (paginationData) {
            setPagination(paginationData);
        }
    }, [token]);

    const loadDefaultBudget = useCallback(async (budgets) => {
        const currentMonth = getCurrentMonth();
        const defaultBudget = budgets.find(m => m.month === currentMonth);

        if (defaultBudget) {
            await fetchBudgetInfo(defaultBudget.id);
            await fetchBudgetItems(defaultBudget.id, { 
                BudgetYear: budgetYear, 
                page: 1, 
                pageSize: DEFAULT_PAGE_SIZE 
            });
            const defaultIndex = budgets.findIndex(m => m.month === currentMonth);
            setActiveIndex(defaultIndex);
        }
    }, [budgetYear, fetchBudgetInfo, fetchBudgetItems]);

    const fetchBudgets = useCallback(async () => {
        const data = await UseGetBudgets(token, budgetYear);
        setBudgetMonths(data);
        await loadDefaultBudget(data);
    }, [token, budgetYear, loadDefaultBudget]);

    return {
        budgetMonths,
        selectedBudget,
        budgetItems,
        activeIndex,
        pagination,
        setBudgetItems,
        setSelectedBudget,
        setActiveIndex,
        setPagination,
        fetchBudgetInfo,
        fetchBudgetItems,
        fetchBudgets
    };
};

