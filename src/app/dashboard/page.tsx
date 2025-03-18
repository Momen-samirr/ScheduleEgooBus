import { getBanners } from "@/actions/banner.action";
import { getDbUser } from "@/actions/user.action";
import CompanyCard from "@/components/HunkelCard";
import Slider from "@/components/Slider";
import UserDashboard from "@/components/UserDashboard";
import VoiceflowChat from "@/components/VoiceflowChat";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
const DashboardRoute = async () => {
  const banners = await getBanners();
  const dbUser = await getDbUser();

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!dbUser) return redirect("/");

  if (dbUser?.role === "user") {
    return <UserDashboard />;
  }
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-10">
        <div className="lg:col-span-5">
          <CompanyCard
            title=" جداول ما بعد شهر رمضان"
            href="/dashboard/b2c"
            // subTitle="رحلات فردية"
            // subHref="/dashboard/solo"
            veicle="هاي اس"
            availability="Now Available"
            topic=" توزيعة ما بعد رمضان"
            src="/uber.png"
          />
        </div>
        <div className="lg:col-span-5">
          <CompanyCard
            title="جداول شغل"
            href="/dashboard/b2cramadan"
            subTitle="رحلات فردية"
            subHref="/dashboard/solo"
            veicle="هاي اس"
            availability="Now Available"
            topic="جداول شغل من فتره 16 الي 20"
            src="/uber.png"
          />
        </div>
        {user?.email !== "tareqmohamed604@gmail.com" ? (
          <>
            <div className="lg:col-span-5">
              <CompanyCard
                title="Hunkel"
                href="/dashboard/hunkel"
                veicle="ملاكي"
                availability="Now Available"
                topic="شركات"
                subTitle="Reserved Trips"
                subHref="/dashboard/reservedTrips"
                adminTitle="Admin Show"
                adminRoute="/dashboard/adminShow"
              />
            </div>
            <div className="lg:col-span-5">
              <CompanyCard
                title="New Henkel schedule"
                href="/dashboard/testCard"
                veicle="ملاكي"
                availability="Available Soon"
                topic="شركات"
                subTitle="My Reserved Schedule"
                subHref="/dashboard/myRoute"
                adminTitle="Admin Show"
                adminRoute="/dashboard/hunkelAdminShow"
              />
            </div>
          </>
        ) : null}
        <div className="lg:col-span-5">
          <CompanyCard
            title="New Raf3 Schedule"
            href="/dashboard/upschedule"
            availability="Now Available"
            topic="رفع الجداول"
            veicle="هاي اس"
          />
        </div>
      </div>
      <VoiceflowChat />
    </>
  );
};

export default DashboardRoute;
