"use client";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { Settings } from "lucide-react";
import React from "react";

const AdminWelcomeSection = () => {
  const { user } = useKindeAuth();
  return (
    <div className="mb-11 flex items-center justify-between bg-linear-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
      <div className="space-y-5">
        <div className="inline-flex items-center gap-3 bg-linear-to-r from-primary/5 to-primary/10 px-3 py-1 rounded-full border border-primary/10">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <span className="text-primary text-sm font-medium">
            Admin Dashboard
          </span>
        </div>
        <h2 className="text-4xl font-bold mb-3">
          Welcome Back {user?.given_name}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Manage doctors, oversee appointments, and monitor your dental practice
          performance.
        </p>
      </div>
      <div className="hidden bg-linear-to-br from-primary/20 to-primary/10 rounded-full w-33 h-33 md:flex items-center justify-center">
        <Settings className="size-16 text-primary" />
      </div>
    </div>
  );
};

export default AdminWelcomeSection;
