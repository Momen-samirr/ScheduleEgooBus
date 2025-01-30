import { getBanners } from "@/actions/banner.action";
import CompanyCard from "@/components/HunkelCard";
import Slider from "@/components/Slider";

const DashboardRoute = async () => {
  const banners = await getBanners();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-10">
      <div className="lg:col-span-5">
        <CompanyCard title="Hunkel" href="/dashboard/hunkel" />
      </div>
      <div className="lg:col-span-5">
        <CompanyCard title="B2C" href="/dashboard/b2c" />
      </div>
      <div className="lg:col-span-10">
        <Slider banners={banners} />
      </div>
    </div>
  );
};

export default DashboardRoute;
