"use client";
import ProtectedRoute from "../../components/ProtectedRoute";
import {useAuth} from "../../components/AuthProvider";
import MainLayout from "../../components/dashboard/MainLayout";

export default function DashboardPage() {
    const {token} = useAuth();
  return (
    <ProtectedRoute>
        <MainLayout>
            <h2 className="text-2xl font-bold mb-4">Hoş geldin Kaan!</h2>
            <p>Bu senin dashboard sayfan.</p>
        </MainLayout>
    </ProtectedRoute>
  );
}
