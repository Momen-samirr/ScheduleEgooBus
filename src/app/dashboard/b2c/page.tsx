import { getPostsAdminView, getPostsDriverView } from "@/actions/post.action";
import { getDbUser, getDbUserId } from "@/actions/user.action";
import DeleteNormalTrips from "@/components/DeleteNormalTrips";
import PostCard from "@/components/PostCard";
import PostCardAdminView from "@/components/PostCardAdminView";
import RefreshButton from "@/components/RefreshButtuon";
import { redirect } from "next/navigation";
import React from "react";

const UberRoute = async () => {
  const trips = await getPostsDriverView();
  const dbUserId = await getDbUserId();
  const tripsAdminView = await getPostsAdminView();
  const dbUser = await getDbUser();

  if (dbUser?.role === "user") return redirect("/");
  if (!dbUser) return redirect("/");

  if (!dbUserId) return redirect("/");
  return (
    <div className="max-w-7xl mx-auto px-4 w-full">
      <div className="w-full">
        <div className="space-y-6 w-full">
          {trips.length === 0 && (
            <p className="text-center text-sm text-gray-500">
              No trips found for this time
            </p>
          )}
          {dbUser?.role === "admin" && (
            <div>
              <DeleteNormalTrips />
            </div>
          )}
          <div className="flex items-center justify-end">
            <RefreshButton />
          </div>
          <p className="text-xl text-sky-500">جداول بعد رمضان</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {dbUser?.role !== "admin" ? (
              <>
                {trips.map((trip) => (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                      <PostCard
                        key={trip.id}
                        trip={trip}
                        dbUserId={dbUserId}
                        dbUser={dbUser}
                      />
                    </div>
                  </>
                ))}
              </>
            ) : (
              <>
                {tripsAdminView.map((trip) => (
                  <>
                    <div className="w-full">
                      <PostCardAdminView
                        key={trip.id}
                        trip={trip}
                        dbUserId={dbUserId}
                        dbUser={dbUser}
                      />
                    </div>
                  </>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UberRoute;
