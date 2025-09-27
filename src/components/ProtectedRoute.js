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

  // Token varsa ve daha önce yönlendirme yapılmadıysa children'ı render et
  if (token && !hasRedirected) {
    return children;
  }

  // Loading durumunda veya yönlendirme yapıldıysa null döndür
  return null;
}
