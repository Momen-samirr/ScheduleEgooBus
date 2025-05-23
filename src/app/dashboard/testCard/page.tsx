import { getRoutesWithTrips } from "@/actions/hunkelroute";
import TripHunkelCard from "@/components/TripHunkelCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const TestCard = async () => {
  const routes = await getRoutesWithTrips();
  return (
    <>
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-7">
              <div className="space-y-6 p-6">
                <h1> Available Hunkel Trips</h1>
              </div>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-6">
                  {routes.map((route) => (
                    <TripHunkelCard routeInfo={route} />
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

export default TestCard;
