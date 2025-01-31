import { getBanners } from "@/actions/banner.action";
import { getDbUser } from "@/actions/user.action";
import CompanyCard from "@/components/HunkelCard";
import Slider from "@/components/Slider";
import UserDashboard from "@/components/UserDashboard";

const DashboardRoute = async () => {
  const banners = await getBanners();

  const dbUser = await getDbUser();

  if (dbUser?.role === "user") {
    return <UserDashboard />;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-10">
      <div className="lg:col-span-5">
        <CompanyCard title="Hunkel" href="/dashboard/hunkel" veicle="ملاكي" />
      </div>
      <div className="lg:col-span-5">
        <CompanyCard title="B2C" href="/dashboard/b2c" veicle="هاي اس" />
      </div>
      <div className="lg:col-span-10">
        <Slider banners={banners} />
      </div>
    </div>
  );
};

export default DashboardRoute;
