import { DEFAULT_PAGE_SIZE, EXPENSE_TYPE } from './budgetConstants';

export const getCurrentMonth = () => new Date().getMonth() + 1;

export const extractPaginationData = (data) => {
    const paginationData = Array.isArray(data) ? data[0] : data;
    
    if (paginationData && typeof paginationData === 'object') {
        return {
            page: paginationData.page || 1,
            pageSize: paginationData.pageSize || DEFAULT_PAGE_SIZE,
            totalCount: paginationData.totalCount || 0
        };
    }
    return null;
};

export const createEmptyBudgetItems = (newItem) => [{
    expenses: [newItem],
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalCount: 1
}];

export const updateBudgetAmount = (budget, item, operation) => {
    const amount = parseFloat(item.amount);
    const isExpense = item.expenseType === EXPENSE_TYPE;
    const multiplier = operation === 'add' ? 1 : -1;
    
    const updatedBudget = { ...budget };
    
    if (isExpense) {
        updatedBudget.expense = (updatedBudget.expense || 0) + (amount * multiplier);
        updatedBudget.amount = (updatedBudget.amount || 0) - (amount * multiplier);
    } else {
        updatedBudget.saving = (updatedBudget.saving || 0) + (amount * multiplier);
        updatedBudget.amount = (updatedBudget.amount || 0) + (amount * multiplier);
    }
    
    return updatedBudget;
};

export const addExpenseToList = (expenses, newItem, pageSize) => {
    if (expenses.length < pageSize) {
        return [newItem, ...expenses];
    }
    return [newItem, ...expenses].slice(0, pageSize);
};

