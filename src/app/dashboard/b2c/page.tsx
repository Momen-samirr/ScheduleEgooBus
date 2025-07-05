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

  if (dbUser?.role !== "admin") return redirect("/");
  if (!dbUser) return redirect("/");

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
              <DeleteNormalTrips />
            </div>
          )}
          <div className="flex items-center justify-end">
            <RefreshButton />
          </div>
          <p className="text-xl text-red-500">
            تنويه هام: أي جدول تطلبه سيتم تنزيله تلقائيًا، ولا يمكن إلغاؤه إلا
            بعد إبلاغ مستر هاني كارم.
          </p>
          <p className="text-xl text-sky-500">جداول قوة المكتب</p>
          {/* <p className="text-xl text-red-500">جداول شغل شهر رمضان</p> */}
          {dbUser?.role !== "admin" ? (
            <>
              {trips.map((trip) => (
                <PostCard
                  key={trip.id}
                  trip={trip}
                  dbUserId={dbUserId}
                  dbUser={dbUser}
                />
              ))}
            </>
          ) : (
            <>
              {tripsAdminView.map((trip) => (
                <PostCardAdminView
                  key={trip.id}
                  trip={trip}
                  dbUserId={dbUserId}
                  dbUser={dbUser}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UberRoute;
