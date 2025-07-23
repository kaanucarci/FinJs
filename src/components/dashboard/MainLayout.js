"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({ children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <div className="min-h-screen flex">
            <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
            <div className="flex-1 flex flex-col md:ml-64">
                <Header toggle={toggleSidebar} />
                <main className="p-4 bg-gray-100 min-h-screen">{children}</main>
            </div>
        </div>
    );
}
