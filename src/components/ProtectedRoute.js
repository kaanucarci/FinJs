"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { LOGIN_URL } from "@/utils/urlConstants";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!loading && !token && !hasRedirected) {
      setHasRedirected(true);
      router.push(LOGIN_URL);
    }
  }, [token, loading, hasRedirected, router]);

  if (token && !hasRedirected) {
    return children;
  }

  return null;
}
