import { getAllReservedTrips } from "@/actions/hunkel.action";
import { getDbUser } from "@/actions/user.action";
import AdminTable from "@/components/AdminTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import React from "react";

const AdminShowRoute = async () => {
  const reservedTrips = await getAllReservedTrips();
  const user = await getDbUser();

  if (user?.role === "user") return redirect("/");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Show</CardTitle>
      </CardHeader>
      <CardContent>
        {user?.role !== "driver" && <AdminTable trips={reservedTrips} />}
      </CardContent>
    </Card>
  );
};

export default AdminShowRoute;
