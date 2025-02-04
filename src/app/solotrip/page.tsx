import UploadSoloTrip from "@/components/UploadSoloTrip";
import UploadTrips from "@/components/UploadTrips";

export default async function UploadPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Solo Trips</h1>
      <UploadSoloTrip />
    </div>
  );
}
