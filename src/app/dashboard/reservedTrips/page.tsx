import { getReservedTrips } from "@/actions/hunkel.action";
import ReservedTripsTable from "@/components/ReservedTripsTable";
import TableData from "@/components/TabelData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const ReservedTripsRoute = async () => {
  const reservedTrips = await getReservedTrips();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Reserved Trips</CardTitle>
      </CardHeader>
      <CardContent>
        <TableData trips={reservedTrips} />
      </CardContent>
    </Card>
  );
};

export default ReservedTripsRoute;
