import { getSoloPosts, getSoloRamdanTrips } from "@/actions/post.action";
import { getDbUser, getDbUserId } from "@/actions/user.action";
import DeleteSoloTrips from "@/components/DeleteSoloTrips";
import PostCard from "@/components/PostCard";
import { redirect } from "next/navigation";
import React from "react";

const SoloTripRoute = async () => {
  const trips = await getSoloRamdanTrips();
  const dbUserId = await getDbUserId();
  const dbUser = await getDbUser();

  if (!dbUserId) return redirect("/");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-7">
        <div className="space-y-6">
          {trips.length === 0 && (
            <p className="text-center text-sm text-gray-500">
              No trips found for this time
            </p>
          )}
          {dbUser?.role === "admin" && (
            <div>
              <DeleteSoloTrips />
            </div>
          )}
          {trips.map((trip) => (
            <PostCard key={trip.id} trip={trip} dbUserId={dbUserId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoloTripRoute;
