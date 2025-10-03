"use client";
import React, { useEffect, useRef, useCallback, useMemo } from "react";
import BudgetMonths from "@/components/Dashboard/Budgets/BudgetMonths";
import BudgetInfo from "@/components/Dashboard/Budgets/BudgetInfo";
import BudgetItems from "./BudgetItems";
import { useAuth } from "@/components/AuthProvider";
import { useBudgetData } from "@/hooks/useBudgetData";
import { useBudgetHandlers } from "@/hooks/useBudgetHandlers";
import { useSignalR } from "@/hooks/useSignalR";

const Budgets = ({ budgetYear }) => {
  const { token } = useAuth();
  const hasFetched = useRef(false);

  const budgetData = useBudgetData(token, budgetYear);

  const handlers = useBudgetHandlers({
    budgetYear,
    ...budgetData,
  });

  const handleBudgetItemAdd = useCallback((newExpense) => {
    if (budgetData.selectedBudget && newExpense.budgetId === budgetData.selectedBudget.budgetId) {
      handlers.handleBudgetItemAdd(newExpense);
    }
  }, [budgetData.selectedBudget, handlers]);

  const handleBudgetItemUpdate = useCallback((updatedExpense) => {
    if (budgetData.selectedBudget && updatedExpense.budgetId === budgetData.selectedBudget.budgetId) {
      handlers.handleBudgetItemUpdate(updatedExpense);
    }
  }, [budgetData.selectedBudget, handlers]);

  const handleBudgetItemDelete = useCallback((deletedExpense) => {
    if (budgetData.selectedBudget && deletedExpense.budgetId === budgetData.selectedBudget.budgetId) {
      handlers.handleBudgetItemDelete(deletedExpense.id);
    }
  }, [budgetData.selectedBudget, handlers]);

  const handleBudgetUpdate = useCallback((updatedBudget) => {
    if (budgetData.selectedBudget && updatedBudget.budgetId === budgetData.selectedBudget.budgetId) {
      handlers.handleBudgetUpdate(updatedBudget);
    }
  }, [budgetData.selectedBudget, handlers]);

  useEffect(() => {
    if (!token || hasFetched.current) return;
    hasFetched.current = true;
    budgetData.fetchBudgets();
  }, [token, budgetData]);

  const signalREventHandlers = useMemo(() => ({
    onExpenseCreated: handleBudgetItemAdd,
    onExpenseUpdated: handleBudgetItemUpdate,
    onExpenseDeleted: handleBudgetItemDelete,
    onBudgetUpdated: handleBudgetUpdate,
  }), [handleBudgetItemAdd, handleBudgetItemUpdate, handleBudgetItemDelete, handleBudgetUpdate]);

  useSignalR(token, signalREventHandlers);

  if (!token) return null;

  return (
    <>
      <BudgetMonths
        budgetMonths={budgetData.budgetMonths}
        onMonthSelect={handlers.handleMonthSelect}
        activeIndex={budgetData.activeIndex}
        budgetYear={budgetYear}
      />
      <BudgetInfo
        budgetInfo={budgetData.selectedBudget}
        token={token}
      />
      <BudgetItems
        budgetItems={budgetData.budgetItems}
        token={token}
        pagination={budgetData.pagination}
        onPageChange={handlers.handlePageChange}
      />
    </>
  );
};

export default Budgets;
