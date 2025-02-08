import { getAllReservedTrips } from "@/actions/hunkel.action";
import AdminTable from "@/components/AdminTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const AdminShowRoute = async () => {
  const reservedTrips = await getAllReservedTrips();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Show</CardTitle>
      </CardHeader>
      <CardContent>
        <AdminTable trips={reservedTrips} />
      </CardContent>
    </Card>
  );
};

export default AdminShowRoute;
