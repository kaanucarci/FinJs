"use client";
import { Menu } from "lucide-react";

export default function Header({ toggle }) {
    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
            <button onClick={toggle}>
                <Menu className="text-gray-800" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        </header>
    );
}
