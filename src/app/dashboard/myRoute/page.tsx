import { getMyRouteWithTrips } from "@/actions/hunkelroute";
import { getDbUser } from "@/actions/user.action";
import DialogComponet from "@/components/DialogComponet";
import SheetTrip from "@/components/SheetTrip";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const MyRouteRoute = async () => {
  const myRoute = await getMyRouteWithTrips();
  const dbUser = await getDbUser();
  return (
    <>
      <Card>
        <CardContent className="p-5 sm:p-6">
          <div className="space-y-5">
            <div className="flex space-x-3 sm:space-x-5">
              <div className="flex-1 min-w-0">
                <p className="mt-2 text-sm text-foreground break-words mb-1">
                  {myRoute?.name}
                </p>
                <div className="flex items-center justify-between pt-3 space-x-5">
                  <DialogComponet routeInfo={myRoute} />
                  <SheetTrip routeInfo={myRoute} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MyRouteRoute;
