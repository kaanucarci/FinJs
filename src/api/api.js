"use client";

import axios from "axios";

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
      throw new Error(data.message || "Login failed");
    

    return data; 
  } catch (error) {
    throw new Error(error.message || "Login failed. Server error.");
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
    throw new Error(error.message || "There is an error");
  }
};