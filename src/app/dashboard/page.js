"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import {useAuth} from "@/components/AuthProvider";
import MainLayout from "@/layouts/MainLayout";


export default function DashboardPage() {
    const {token} = useAuth();
  return (
    <ProtectedRoute>
        <MainLayout>
        </MainLayout>
    </ProtectedRoute>
  );
}
