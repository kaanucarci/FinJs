"use client";
import React, { useEffect, useRef } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import BudgetMonths from "@/components/Dashboard/Budgets/BudgetMonths";
import BudgetInfo from "@/components/Dashboard/Budgets/BudgetInfo";
import BudgetItems from "./BudgetItems";
import { useAuth } from "@/components/AuthProvider";
import { useBudgetData } from "@/hooks/useBudgetData";
import { useBudgetHandlers } from "@/hooks/useBudgetHandlers";

const Budgets = ({ budgetYear }) => {
  const { token } = useAuth();
  const hasFetched = useRef(false);

  const budgetData = useBudgetData(token, budgetYear);

  const handlers = useBudgetHandlers({
    budgetYear,
    ...budgetData,
  });

  useEffect(() => {
    if (!token || hasFetched.current) return;
    hasFetched.current = true;
    budgetData.fetchBudgets();
  }, [token, budgetData]);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5035/hubs/finance", {
        accessTokenFactory: () => token,
      })
      .configureLogging(LogLevel.Information) 
      .withAutomaticReconnect()
      .build();

    connection.on("ExpenseCreated", (newExpense) => {
      console.log("SignalR'dan yeni harcama geldi:", newExpense);
    });

    connection
      .start()
      .then(() => console.log("SignalR baglandi"))
      .catch((err) => console.error("SignalR baglanti hatasi:", err));

    return () => {
      connection.stop();
    };
  }, [token]);

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
        onBudgetUpdate={handlers.handleBudgetUpdate}
        onBudgetItemAdd={handlers.handleBudgetItemAdd}
      />
      <BudgetItems
        budgetItems={budgetData.budgetItems}
        token={token}
        pagination={budgetData.pagination}
        onPageChange={handlers.handlePageChange}
        onBudgetItemUpdate={handlers.handleBudgetItemUpdate}
        onBudgetItemDelete={handlers.handleBudgetItemDelete}
      />
    </>
  );
};

export default Budgets;
