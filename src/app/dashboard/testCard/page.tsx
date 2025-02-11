import { getRoutesWithTrips } from "@/actions/hunkelroute";
import TripHunkelCard from "@/components/TripHunkelCard";
import React from "react";

const TestCard = async () => {
  const routes = await getRoutesWithTrips();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-7">
        <div className="space-y-6">
          {routes.map((route) => (
            <TripHunkelCard routeInfo={route} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestCard;
