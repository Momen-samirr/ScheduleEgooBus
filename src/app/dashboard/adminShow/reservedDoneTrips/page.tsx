import { getAllReservedDoneTrips } from "@/actions/hunkel.action";
import { getDbUser } from "@/actions/user.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import AdminTable from "@/components/AdminTable";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ReservedTripDone = async () => {
  const reservedDoneTrips = await getAllReservedDoneTrips();
  const user = await getDbUser();

  if (user?.role === "user") return redirect("/");
  return (
    <>
      {user?.role !== "driver" && (
        <Button variant={"outline"} size={"sm"} className="mb-3" asChild>
          <Link
            href={`/dashboard/adminShow`}
            className="flex items-center gap-3"
          >
            <div className="flex items-center">
              <ChevronLeft />
              <span>Go to Admin Show</span>
            </div>
          </Link>
        </Button>
      )}
      <Card>
        <CardHeader className="text-green-600">
          <CardTitle>Reserved Done Trips</CardTitle>
        </CardHeader>
        <CardContent>
          {user?.role !== "driver" && <AdminTable trips={reservedDoneTrips} />}
        </CardContent>
      </Card>
    </>
  );
};

export default ReservedTripDone;
