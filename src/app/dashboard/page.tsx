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

  if (!dbUser) return redirect("/");

  if (dbUser?.role === "user") {
    return <UserDashboard />;
  }
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-10">
        <div className="lg:col-span-5">
          <CompanyCard
            title="جداول"
            href="/dashboard/b2cramadan"
            subTitle="رحلات فردية"
            subHref="/dashboard/soloramdan"
            veicle="هاي اس"
            availability="Available Soon"
            topic="تيست لتوزيعة رمضان"
            src="/ramdan.png"
          />
        </div>
        <div className="lg:col-span-5">
          <CompanyCard
            title="جداول"
            href="/dashboard/b2c"
            subTitle="رحلات فردية"
            subHref="/dashboard/solo"
            veicle="هاي اس"
            availability="Now Available"
            topic="شغل الشارع"
          />
        </div>
        <div className="lg:col-span-5">
          <CompanyCard
            title="Hunkel"
            href="/dashboard/hunkel"
            veicle="ملاكي"
            availability="Available Soon"
            topic="شركات"
          />
        </div>
        <div className="lg:col-span-10">
          <Slider banners={banners} />
        </div>
      </div>
      <VoiceflowChat />
    </>
  );
};

export default DashboardRoute;
