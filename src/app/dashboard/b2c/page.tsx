import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import PostCard from "@/components/PostCard";
import { currentUser } from "@clerk/nextjs/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const UberRoute = async () => {
  const trips = await getPosts();
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
          {trips.map((trip) => (
            <PostCard key={trip.id} trip={trip} dbUserId={dbUserId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UberRoute;
