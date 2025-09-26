"use client";

import axios from "axios";
import { toast } from "react-toastify";

export const api = process.env.NEXT_PUBLIC_BASE_API;
export const server = axios.create();
server.defaults.baseURL = api;

/**
 * Genel request wrapper
 * Hata durumunda backend'den donen message'i yakalar
 */
export const request = async (url, options = {}) => {
    try {
        const res = await fetch(`${api}${url}`, options);

        if (res.status === 401) {
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
            return null;
        }

        if (!res.ok) {
            let errorMessage = "There is an error";
            try {
                const errorData = await res.json();
                if (errorData?.message) {
                    errorMessage = errorData.message;
                } else if (typeof errorData === "string") {
                    errorMessage = errorData;
                }
            } catch (_) {
                try {
                    const text = await res.text();
                    if (text) errorMessage = text;
                } catch (_) {}
            }
            toast.error(errorMessage);
            return null;
        }

        return res;
    } catch (error) {
        toast.error(error.message || "Server error");
        return null;
    }
};

// --- API Fonksiyonlari ---

export const UserLogin = async (username, password) => {
    const res = await request(`/Auth/login`, {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
    if (!res) return null;
    return await res.json();
};

export const UseGetBudgetYears = async (token) => {
    const res = await request(`/Budget/year`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!res) return null;
    return await res.json();
}

export const UseCreateBudgetYear = async (token, year) => {
    const res = await request(`/Budget/year/${year}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!res) return null;

    toast.success("Butce basariyla olusturuldu!");
    return res.json();
};

export const UseGetBudgets = async (token, budgetYear) => {
    const res = await request(`/Budget/get/${budgetYear}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!res) return null;
    return await res.json();
};

export const UseGetBudgetInfo = async (token, id, budgetYear) => {
    const res = await request(`/Budget/${id}?budgetYear=${budgetYear}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!res) return null;
    return await res.json();
};

export const UseEditBudget = async (token, data, id) => {
    const res = await request(`/Budget/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!res) return null;

    toast.success("Butce basariyla guncellendi");
    return await res.json();
};

export const UseGetBudgetItems = async (token, filterParams, id) => {
    let params = new URLSearchParams(filterParams).toString();
    const res = await request(`/Budget/list/${id}?${params}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!res) return null;
    return await res.json();
};

export const UseAddBudgetItem = async (token, data) => {
    const res = await request(`/expense`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!res) return null;

    toast.success("Kayit basariyla eklendi!");
    return await res.json();
};

export const UseEditBudgetItem = async (token, data, id) => {
    const res = await request(`/expense/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!res) return null;

    toast.success("Kayit basariyla duzenlendi!");
    return await res.json();
};

export const UseDeleteBudgetItem = async (token, id) => {
    const res = await request(`/expense/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!res) return null;

    toast.success("Kayit basariyla silindi!");
    return true;
};
