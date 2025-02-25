import {
  deleteAllSoloTrips,
  getSoloPosts,
  getSoloRamdanTrips,
} from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import { DeleteAlertDialog } from "@/components/DeleteAlertDialog";
import DeleteSoloTrips from "@/components/DeleteSoloTrips";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Moon, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const RamdanTripsRoute = async () => {
  const trips = await getSoloRamdanTrips();
  const dbUserId = await getDbUserId();

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
          <div>
            <DeleteSoloTrips />
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center font-semibold">
              <Moon />
              <span>توزيعة رمضان، كل عام وحضراتكم بخير</span>
            </div>
          </div>
          {trips.map((trip) => (
            <PostCard key={trip.id} trip={trip} dbUserId={dbUserId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RamdanTripsRoute;
