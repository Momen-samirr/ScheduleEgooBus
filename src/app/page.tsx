import { getBanners } from "@/actions/banner.action";
import { getPostsAdminView } from "@/actions/post.action";
import { getTrips } from "@/actions/trips.action";
import { getDbUserId } from "@/actions/user.action";
import Hero from "@/components/Hero";
// import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import Slider from "@/components/Slider";
import { Button } from "@/components/ui/button";
import UnAuthenticatedmobileSidebar from "@/components/UnAuthenticatedmobileSidebar";
// import TripCard from "@/components/TripCard";
import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function Home() {
  // const user = await currentUser();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const dbUserId = await getDbUserId();
  const trips = await getPostsAdminView();
  const banners = await getBanners();
  console.log("trips:", trips);

  return (
    // <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
    //   <div className="lg:col-span-6">
    //     <div className="md:hidden">
    //       {!user ? <UnAuthenticatedmobileSidebar /> : null}
    //     </div>

    //     {user && (
    //       <div className="space-y-6">
    //         <Slider banners={banners} />
    //       </div>
    //     )}
    //   </div>

    //   <Hero />

    //   <div className="hidden lg:block lg:col-span-4 sticky top-20">
    //     <WhoToFollow />
    //   </div>
    // </div>
    <div className="min-h-screen bg-background">
      <Hero />
    </div>
  );
}
