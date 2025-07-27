"use client";
import Header from "@/components/Dashboard/Header/Header";
import Filters from "@/components/Dashboard/Filter/Filters";
import Budgets from "@/components/Dashboard/Budgets/Budgets";

export default function MainLayout({ children }) {
    return (
       <>
       <Header/>
       <Filters/>
       <Budgets/>
       </>
    );
}
