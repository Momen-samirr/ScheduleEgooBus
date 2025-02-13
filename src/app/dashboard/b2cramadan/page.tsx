import { getPosts } from "@/actions/post.action";
import { getDbUser, getDbUserId } from "@/actions/user.action";
import PostCard from "@/components/PostCard";
import { HeartIcon, Moon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const UberRoute = async () => {
  const trips = await getPosts();
  const dbUserId = await getDbUserId();
  const dpuser = await getDbUser();
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
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center font-semibold">
              <Moon />
              <span>توزيعة رمضان، كل عام وحضراتكم بخير</span>
            </div>
          </div>
          {trips.map((trip) => (
            <PostCard
              key={trip.id}
              trip={trip}
              dbUserId={dbUserId}
              dbuser={dpuser}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UberRoute;
