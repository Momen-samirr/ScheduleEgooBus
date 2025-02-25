import { getAllReservedTrips } from "@/actions/hunkel.action";
import { getDbUser } from "@/actions/user.action";
import AdminTable from "@/components/AdminTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const AdminShowRoute = async () => {
  const reservedTrips = await getAllReservedTrips();
  const user = await getDbUser();

  if (user?.role === "user") return redirect("/");
  return (
    <>
      {user?.role !== "driver" && (
        <Button variant={"outline"} size={"sm"} className="mb-3" asChild>
          <Link
            href={`/dashboard/adminShow/reservedDoneTrips`}
            className="flex items-center gap-3"
          >
            <div className="flex items-center">
              <ChevronRight />
              <span>Go to Reserved Done Trips</span>
            </div>
          </Link>
        </Button>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Admin Show</CardTitle>
        </CardHeader>
        <CardContent>
          {user?.role !== "driver" && <AdminTable trips={reservedTrips} />}
        </CardContent>
      </Card>
    </>
  );
};

export default AdminShowRoute;
