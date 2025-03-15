import { getDbUser, getHunkelDrivers, getUsers } from "@/actions/user.action";
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

  if (user?.role === "driver") return redirect("/");
  const users = await getHunkelDrivers();

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
