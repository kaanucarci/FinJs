"use client";

import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const api = process.env.NEXT_PUBLIC_BASE_API;
export const server = axios.create();
server.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_API;


export const AuthLogin = async (
    Username = null,
    Password = null,
    AuthKey = null
  ) => {
    if (AuthKey) return server.post("/dashboard");
    return server.post(
      "/auth/login",
      "Username=" + Username + "&Password=" + Password
    );
  };