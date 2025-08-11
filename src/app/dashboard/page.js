"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import {useAuth} from "@/components/AuthProvider";
import MainLayout from "@/layouts/MainLayout";


export default function DashboardPage() {
  return (
    <ProtectedRoute>
        <MainLayout>
        </MainLayout>
    </ProtectedRoute>
  );
}
