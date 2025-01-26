import CompanyCard from "@/components/HunkelCard";

const DashboardRoute = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-10">
      <div className="lg:col-span-5">
        <CompanyCard title="Hunkel" />
      </div>
      <div className="lg:col-span-5">
        <CompanyCard title="B2C" />
      </div>
    </div>
  );
};

export default DashboardRoute;
