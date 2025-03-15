import { getReservedRoutes, getRoutesWithTrips } from "@/actions/hunkelroute";
import { getDbUser } from "@/actions/user.action";
import TripHunkelCard from "@/components/TripHunkelCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";
import React from "react";

const HunkelAdminShow = async () => {
  const reservedRoutes = await getReservedRoutes();
  const dbUser = await getDbUser();

  if (dbUser?.role !== "admin") return redirect("/");
  return (
    <>
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-7">
              <div className="space-y-6 p-6">
                <h1> Admin Show</h1>
              </div>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-6">
                  {reservedRoutes?.map((route) => (
                    <TripHunkelCard routeInfo={route} dbUser={dbUser} />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default HunkelAdminShow;
