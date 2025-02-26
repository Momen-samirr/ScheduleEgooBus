import { getReservedTrips } from "@/actions/hunkel.action";
import { getDbUser } from "@/actions/user.action";
import ReservedTripsTable from "@/components/ReservedTripsTable";
import TableData from "@/components/TabelData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const ReservedTripsRoute = async () => {
  const reservedTrips = await getReservedTrips();

  return (
    <>
      <Button variant={"outline"} size={"sm"} className="mb-3" asChild>
        <Link href={`/dashboard/hunkel`} className="flex items-center gap-3">
          <div className="flex items-center">
            <ChevronLeft />
            <span>Go to Available Hunkel Trips</span>
          </div>
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Your Reserved Trips</CardTitle>
        </CardHeader>
        <CardContent>
          <TableData trips={reservedTrips} />
        </CardContent>
      </Card>
    </>
  );
};

export default ReservedTripsRoute;
