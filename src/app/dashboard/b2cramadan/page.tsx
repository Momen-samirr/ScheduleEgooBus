import {
  getRamdanPostsAdminView,
  getRamdanPostsDriverView,
} from "@/actions/post.action";
import { getDbUser, getDbUserId } from "@/actions/user.action";
import AdminVwPost from "@/components/AdminVwPost";
import NormalPostDriverView from "@/components/NormalPostDriverView";
import PostCard from "@/components/PostCard";
import RefreshButton from "@/components/RefreshButtuon";
import { HeartIcon, Moon, Settings } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const UberRoute = async () => {
  const trips = await getRamdanPostsDriverView();
  const dbUserId = await getDbUserId();
  const tripsAdminView = await getRamdanPostsAdminView();
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
          <div className="flex items-center justify-end">
            <RefreshButton />
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center font-semibold">
              <Settings />
              <span>جداول شغل</span>
            </div>
          </div>
          {dbUser?.role !== "admin" ? (
            <>
              {trips.map((trip) => (
                <NormalPostDriverView
                  key={trip?.id}
                  trip={trip}
                  dbUserId={dbUserId}
                />
              ))}
            </>
          ) : (
            <>
              {tripsAdminView?.map((trip) => (
                <>
                  <AdminVwPost
                    key={trip.id}
                    trip={trip}
                    dbUserId={dbUserId}
                    dbUser={dbUser}
                  />
                </>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UberRoute;
