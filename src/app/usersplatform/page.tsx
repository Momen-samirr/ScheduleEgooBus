import { getDbUser, getUsers } from "@/actions/user.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import UsersTabel from "@/components/UsersTabel";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const UsersRoute = async () => {
  const user = await getDbUser();

  if (user?.role !== "admin") return null;
  const users = await getUsers();
  console.log("users:", users);

  return (
    <Card className="p-6">
      <CardTitle className="mb-3">Users</CardTitle>
      <CardDescription>
        This is route for fetch users to verify them in the platform
      </CardDescription>
      <CardContent>
        <UsersTabel users={users} />
      </CardContent>
    </Card>
  );
};

export default UsersRoute;
