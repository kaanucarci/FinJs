"use client";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Welcome to Dashboard!</h1>
      </div>
    </ProtectedRoute>
  );
}
