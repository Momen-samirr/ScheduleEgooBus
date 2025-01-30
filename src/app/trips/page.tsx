import UploadTrips from "@/components/UploadTrips";

export default async function UploadPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload B2C Trips</h1>
      <UploadTrips />
    </div>
  );
}
