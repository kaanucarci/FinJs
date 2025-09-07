"use client";

import axios from "axios";
import {toast} from "react-toastify";

export const api = process.env.NEXT_PUBLIC_BASE_API;
export const server = axios.create();
server.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_API;

export const UserLogin = async (username, password) => {
  try {
    const res = await fetch(`${api}/Auth/login`, {
      method: "POST",
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok)
        toast.error(error.message || "Login failed.");
    

    return data; 
  } catch (error) {
      toast.error(error.message || "Login failed. Server error");
  }
};

export const UseGetBudgets = async (token) => {
  try {
    const res = await fetch(`${api}/Budget`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    
    return res.json();
   }
  catch (error) {
      toast.error(error.message || "There is an error");
  }
};

export const UseGetBudgetInfo = async (token, id) => {
    try {
        const res = await fetch(`${api}/Budget/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        return res.json();
    }
    catch (error) {
        toast.error(error.message || "There is an error");
    }
};


export const UseEditBudget = async (token, data, id) => {
    try {
        const res = await fetch(`${api}/Budget/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok){
            toast.error(error.message || "There is an error");
            return;
        }

        toast.success("Butce basariyla guncellendi");
        return await res.json();
    }
    catch (error) {
        toast.error(error.message || "There is an error");
    }
};