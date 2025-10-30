"use server";
import { getDbUser } from "@/actions/user.action";
import { redirect } from "next/navigation";
import React from "react";
import AdminDashboardClient from "./AdminDashboardClient";

const AdminPage = async () => {
  const dbUser = await getDbUser();
  if (dbUser?.role !== "admin") redirect("/");
  return <AdminDashboardClient />;
};

export default AdminPage;
