"use client";

import axios from "axios";
import {toast} from "react-toastify";

export const api = process.env.NEXT_PUBLIC_BASE_API;
export const server = axios.create();
server.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_API;

export const request = async (url, options = {}) => {
    try {
        const res = await fetch(`${api}${url}`, options);

        if (res.status === 401) {
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
            return;
        }

        return res;
    } catch (error) {
        return error;
    }
};


export const UserLogin = async (username, password) => {
    try {
        const res = await request(`/Auth/login`, {
            method: "POST",
            headers: {
                "accept": "text/plain",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!res || !res.ok) {
            toast.error("Login failed.");
            return;
        }

        return await res.json();
    } catch (error) {
        toast.error(error.message || "Login failed. Server error");
    }
};

export const UseGetBudgets = async (token) => {
    try {
        const res = await request(`/Budget`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res) return;
        return await res.json();
    } catch (error) {
        toast.error(error.message || "There is an error");
    }
};

export const UseGetBudgetInfo = async (token, id) => {
    try {
        const res = await request(`/Budget/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res) return;
        return await res.json();
    } catch (error) {
        toast.error(error.message || "There is an error");
    }
};

export const UseEditBudget = async (token, data, id) => {
    try {
        const res = await request(`/Budget/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!res || !res.ok) {
            toast.error("There is an error");
            return;
        }

        toast.success("Butce basariyla guncellendi");
        return await res.json();
    } catch (error) {
        console.log(error);
        toast.error(error.message || "There is an error");
    }
};

export const UseGetBudgetItems = async (token, filterParams, id) => {
    try {
        let params = new URLSearchParams(filterParams).toString();
        const res = await request(`/Budget/list/${id}?${params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res || !res.ok) {
            toast.error("There is an error");
            return;
        }

        return await res.json();
    } catch (error) {
        console.log(error);
        toast.error(error.message || "There is an error");
    }
};

export const UseAddBudgetItem = async (token, data, endPoint) => {
    try {
        const res = await request(`/${endPoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!res || !res.ok) {
            toast.error("There is an error");
            return;
        }else {
            toast.success("Kayit basariyla eklendi!");
        }
        return await res.json();
    } catch (error) {
        console.log(error);
        toast.error(error.message || "There is an error");
    }
};

export const UseEditBudgetItem = async (token, data, endPoint, id) => {
    try {
        const res = await request(`/${endPoint}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!res || !res.ok) {
            toast.error("There is an error");
            return;
        }else {
            toast.success("Kayit basariyla duzenlendi!");
        }
        return await res.json();
    } catch (error) {
        console.log(error);
        toast.error(error.message || "There is an error");
    }
};

export const UseDeleteBudgetItem = async (token,endPoint, id) => {
    try {
        const res = await request(`/${endPoint}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res || !res.ok) {
            toast.error("There is an error");
        }else {
            toast.success("Kayit basariyla silindi!");
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message || "There is an error");
    }
};