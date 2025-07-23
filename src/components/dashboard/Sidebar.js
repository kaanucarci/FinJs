"use client";
import {useState} from "react";
import {Menu} from "lucide-react";
import {ChevronDown, ChevronUp} from "lucide-react";
import Link from "next/link";

export default function Sidebar({isOpen, toggle}) {
    const [openDropdown, setOpenDropdown] = useState(true);
    return (
        <aside
            className={`fixed z-40  h-screen bg-gray-800 text-white transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:w-50`}>
            <div className="p-4 flex justify-between items-center md:hidden">
                <span className="text-lg font-bold">Menü</span>
                <button onClick={toggle}><Menu/></button>
            </div>

            <nav className="mt-6 px-4 space-y-2">
                <a href="/dashboard" className="block p-2 rounded hover:bg-gray-700">FinJS</a>

                {/* Dropdown Başlangıç */}
                <div>
                    <button
                        onClick={() => setOpenDropdown(!openDropdown)}
                        className="w-full flex justify-between items-center p-2 rounded hover:bg-gray-700">
                        SENELER
                        {openDropdown ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </button>
                    {openDropdown && (
                        <div className="pl-4 space-y-1">
                            <a href="/report/monthly" className="block p-2 rounded hover:bg-gray-700 text-sm">Aylık
                                Rapor</a>
                            <a href="/report/yearly" className="block p-2 rounded hover:bg-gray-700 text-sm">Yıllık
                                Rapor</a>
                        </div>
                    )}
                </div>
                {/* Dropdown Bitiş */}
            </nav>
        </aside>
    );
}
