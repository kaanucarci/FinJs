"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push("/login");
    }
  }, [token, loading]);

  return token ? children : null;
}
