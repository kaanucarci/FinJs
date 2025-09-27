"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!loading && !token && !hasRedirected) {
      setHasRedirected(true);
      router.push("/login");
    }
  }, [token, loading, hasRedirected, router]);

  if (token && !hasRedirected) {
    return children;
  }

  return null;
}
