"use client";
import React from "react";
import AdminWelcomeSection from "./AdminWelcomeSection";
import { useGetUsers } from "@/hooks/use-users";
import AdminStatus from "@/components/admin/AdminStatus";
import PaymentsManagement from "@/components/admin/PaymentsManagement";

const AdminDashboardClient = () => {
  const { data: users, isLoading, error } = useGetUsers();

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  const status = {
    totalUsers: users?.length ?? 0,
    totalAdminUsers:
      users?.filter((user: any) => user.role === "admin").length ?? 0,
    totalDriverUsers:
      users?.filter((user: any) => user.role === "driver").length ?? 0,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <AdminWelcomeSection />
        <AdminStatus
          totalUsers={status.totalUsers}
          totalAdminUsers={status.totalAdminUsers}
          totalDriverUsers={status.totalDriverUsers}
        />
        <PaymentsManagement />
      </div>
    </div>
  );
};

export default AdminDashboardClient;
